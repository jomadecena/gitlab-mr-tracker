import React, {Component} from 'react';
import { Card, Grid, Icon, Image } from 'semantic-ui-react';
import './MergeRequestCard.css';
import {resetMergeRequestList, addToMergeRequestList} from "../../../../actions/merge-requests";
import {connect} from 'react-redux';
import GitlabService from '../../../../services/gitlab.service';
import {parse} from "query-string";
import Pipeline from "../pipeline/Pipeline";
import Check from '../../../../images/check.png';

class MergeRequestList extends Component {
  constructor(props){
    super(props);
    this.state = {
      mrList: []
    };

    this.namespace = this.props.project.namespace;
    this.project = this.props.project.project;
    this.token = parse(window.location.search).token;
    this.GitlabService = new GitlabService();
  }

  async componentDidMount() {
    await this.getMergeRequests();
    setInterval(async () => {
      this.props.resetMergeRequestList();
      this.setState({mrList: []});
      await this.getMergeRequests();
    }, this.props.rule[0] * 1000);
  }

  async getMergeRequests() {
    const response =
      await this.GitlabService.getOpenMergeRequest(this.namespace, this.project, this.token);
    response.data.forEach(async proj => {
      proj.name = this.props.project.name;
      let pipeline = await this.getPipelineStatus(proj.source_branch);
      // TODO this is not working
      proj.status = pipeline.data.length > 0 ? pipeline.data[0].status : 'No Pipeline';
    });

    this.props.addToMergeRequestList(response.data);
    this.setState({mrList: response.data});
  }

  async getPipelineStatus(branch) {
    return await this.GitlabService.getLatestPipeline(this.namespace, this.project
      ,branch, this.token);
  }


  renderElapsedTime(date) {
    const timeDiff = Math.abs(new Date().getTime() - new Date(date).getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const className = diffDays >= this.props.rule[2] ? 'past-due' : '';
    return <span className={className}>{`${diffDays} day${(diffDays > 1 ? 's': '')}`}</span>;
  }

  static renderAssignee(assignee) {
    let name  = 'NO ASSIGNEE YET!';
    let className = 'assignee-name no-assignee';
    if (assignee) {
      name = assignee.name;
      className = 'assignee-name';
    }
    return <span className={className}>{name}</span>;
  }

  getCardColor(mr) {
    return `card-${this.getRule(mr)}`;
  };

  getRule(mr) {
    const label = this.props.rule[3];
    if(mr.work_in_progress) return 'white';
    else if(this.getPriority(label.high, mr)) return 'red';
    else if(this.getPriority(label.medium, mr)) return 'orange';
    return 'green';
  }

  getPriority(rules, mr) {
    if (rules.hasOwnProperty('label')) {
      return mr.labels.some(l => rules.label.includes(l) >= 0);
    }
    if (rules.hasOwnProperty('branch')) {
      return rules.branch.split(',').some(b => mr.source_branch.startsWith(b));
    }
    if (rules.hasOwnProperty('project')) {
      console.log(rules.project.split(',').some(p => this.project === p))
      return rules.project.split(',').some(p => this.project === p);
    }
    return false;
  }

  isReady(mr) {
    return mr.upvotes === this.props.rule[2]
      && !mr.work_in_progress
      && mr.merge_status === 'can_be_merged';
  }

  render() {
    return (
      this.state.mrList ?
      this.state.mrList.map((mr) =>
        <Grid.Column key={mr.id} width={5}>
          <Card fluid={true}>
            <Card.Content className={this.getCardColor(mr)}>
              {this.isReady(mr) ?
                <Image floated='right' size='mini' src={Check}/> : null
              }
              <Card.Header>{mr.title}</Card.Header>
              <Card.Meta>{mr.name}</Card.Meta>
              <Card.Description>
                <Icon name='detective' />{MergeRequestList.renderAssignee(mr.assignee)}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Grid className='mr-details'>
                <Grid.Column width={8}>
                  <Icon name='user' />
                  <span className="author-name">{mr.author.username}</span> <br />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Icon name='thumbs up' /> {mr.upvotes} <br />
                </Grid.Column>
              </Grid>
              <Grid className='mr-details'>
                <Grid.Column width={8}>
                  <Icon name='angle double right' />
                  <Pipeline proj={this.props.project} branch={mr.source_branch}/>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Icon name='time' /> {this.renderElapsedTime(mr.created_at)}
                </Grid.Column>
              </Grid>
            </Card.Content>
          </Card>
        </Grid.Column>
      ): ''
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetMergeRequestList: () => dispatch(resetMergeRequestList()),
    addToMergeRequestList: (list) => dispatch(addToMergeRequestList(list)),
  };
};

export default connect(null, mapDispatchToProps)(MergeRequestList);
