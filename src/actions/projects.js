import * as qs from 'query-string';
import {getProjectsFromFile} from '../utils/file-reader';

export const GET_PROJECTS = 'GET_PROJECTS';

export const getProjectList = () => {
  return {
    type: GET_PROJECTS,
    payload: getFromFile()
  }
};

async function getFromFile() {
  const parsed = qs.parse(window.location.search);
  return await getProjectsFromFile(parsed.config);
}