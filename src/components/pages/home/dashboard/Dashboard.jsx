import React, {Component} from 'react';

import './Dashboard.css';
import {connect} from 'react-redux';
import {getProjectList} from "../../../../actions/projects";
import {getRules} from "../../../../actions/rules";
import MergeRequestCard from "../merge-request-card/MergeRequestCard";
import {Grid} from "semantic-ui-react";

class Dashboard extends Component {
  async componentDidMount() {
    await Promise.all([
      await this.props.getProjectList(),
      await this.props.getRules()
      ]);
  }

  render() {
    return (
      <div>
        <Grid className="Project-container">
          {
            this.props.projects && this.props.rules ?
              this.props.projects.map((project, index) =>
                <MergeRequestCard key={index} project={project} rule={this.props.rules}/>
              ) : 'Projects not loading yet...'
          }
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    rules: state.rules
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectList: () => dispatch(getProjectList()),
    getRules: () => dispatch(getRules()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
