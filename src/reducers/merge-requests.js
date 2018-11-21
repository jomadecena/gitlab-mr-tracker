import {RESET_MERGE_REQUESTS_LIST, ADD_TO_MERGE_REQUESTS_LIST} from "../actions/merge-requests";
import _ from 'lodash';

export default function(state = [], action) {
  if(action.type === RESET_MERGE_REQUESTS_LIST) {
    return [];
  }
  if(action.type === ADD_TO_MERGE_REQUESTS_LIST) {
    const currState = _.clone(state);
    return pushToArray(currState, action.list);
  }
  return state;
};

function pushToArray(currState, list) {
  _.forEach(list, (data) => currState.push(data));
  return currState;
}