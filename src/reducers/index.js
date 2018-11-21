import {combineReducers} from 'redux';
import projects from './projects';
import mergeRequests from './merge-requests';
import rules from './rules';

const rootReducer = combineReducers({
  projects,
  mergeRequests,
  rules
});

export default rootReducer;
