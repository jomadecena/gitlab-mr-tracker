export const RESET_MERGE_REQUESTS_LIST = 'CREATE_MERGE_REQUESTS_LIST';
export const ADD_TO_MERGE_REQUESTS_LIST = 'ADD_TO_MERGE_REQUESTS_LIST';

export const resetMergeRequestList = (list) => {
  return {
    type: RESET_MERGE_REQUESTS_LIST,
    value: list
  }
};

export const addToMergeRequestList = (list) => {
  return {
    type: ADD_TO_MERGE_REQUESTS_LIST,
    list: list
  }
};