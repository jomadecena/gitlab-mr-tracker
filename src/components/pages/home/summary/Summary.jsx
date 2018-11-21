import React, {Component} from 'react';
import './Summary.css';
import {connect} from 'react-redux';
import logo from '../../../../images/gitlab-logo.png';

class Summary extends Component {
  render() {
    return (
      <div id='Summary' style={{color: 'black', backgroundColor: 'white', height: '100%'}}>
        <div id='Summary-logo'>
          <img src={logo} width={100} height={100} alt="Gitlab Logo" />
        </div>
        <div className="Summary-detail">
          <span className="Summary-count">{this.props.mergeRequests.length}&nbsp;</span>
          <span className="Summary-label">TOTAL</span>
        </div>
        <div className="Summary-detail">
          <span className="Summary-count">{this.getReadyForMerge()}&nbsp;</span>
          <span className="Summary-label">READY</span>
        </div>
      </div>
    );
  }

  getReadyForMerge() {
    return this.props.mergeRequests.filter(mr => mr.upvotes >= this.props.rules[2]).length;
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    rules: state.rules,
    mergeRequests: state.mergeRequests
  };
};

export default connect(mapStateToProps)(Summary);