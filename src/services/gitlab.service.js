import fitch from 'fitch';
import GITLAB_CONFIG  from './gitlab.config';

class GitlabService {
  constructor() {
    this.fitch = fitch;
  }

  async getOpenMergeRequest(namespace, project, token) {
    const url = `${GITLAB_CONFIG.url}/${GITLAB_CONFIG.version}`
      + `/projects/${encodeURIComponent(namespace)}%2F${encodeURIComponent(project)}`
      + `/merge_requests?state=opened&private_token=${token}`;
    return await fitch.get(url);
  }

  getLatestPipeline(namespace, project, branch, token) {

    const url = `${GITLAB_CONFIG.url}/${GITLAB_CONFIG.version}`
      + `/projects/${encodeURIComponent(namespace)}%2F${encodeURIComponent(project)}`
      + `/pipelines?ref=${branch}&private_token=${token}`;
    return fitch.get(url);
  }

}

export default GitlabService;