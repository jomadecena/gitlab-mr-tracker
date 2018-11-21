import * as qs from 'query-string';
import {getProjectsFromFile} from '../utils/file-reader';

export const GET_RULES = 'GET_RULES';

export const getRules = () => {
  return {
    type: GET_RULES,
    payload: getFromFile()
  }
};

async function getFromFile() {
  const parsed = qs.parse(window.location.search);
  return await getProjectsFromFile(parsed.config);
}