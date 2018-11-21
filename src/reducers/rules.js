import {GET_RULES} from "../actions/rules";

export default function(state = [], action) {
  if(action.type === `${GET_RULES}_FULFILLED`) {
    return action.payload.rules;
  }
  return state;
}