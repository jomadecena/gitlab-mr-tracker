import React, {Component} from 'react';
import GitlabService from '../../../../services/gitlab.service';
import './Pipeline.css';
import * as qs from 'query-string';

class Pipeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ''
    };
    this.GitlabService = new GitlabService();
  }

  componentDidMount() {
    this.getPipelineStatus();
    setInterval(() => {
      this.getPipelineStatus();
    }, 600 * 1000);
  }

  getPipelineStatus() {
    let self = this;
    const parsed = qs.parse(window.location.search);
    this.GitlabService.getLatestPipeline(this.props.proj.namespace, this.props.proj.project
      ,this.props.branch, parsed.token)
      .then(result => {
        self.setState({status: ''});
        self.setState({status: result.data.length > 0 ? result.data[0].status : 'No Pipeline'});
      });

  }

  render() {
    return (
      <span className={this.state.status}>{this.state.status.toUpperCase()}</span>
    )
  }
}

export default Pipeline;