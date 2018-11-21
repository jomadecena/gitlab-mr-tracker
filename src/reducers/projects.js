import {GET_PROJECTS} from "../actions/projects";

export default function(state = [], action) {
  if(action.type === `${GET_PROJECTS}_FULFILLED`) {
    return action.payload.projects;
  }
  return state;
}