export const getProjectsFromFile = async (filePath) => {
  if (filePath == null || filePath === '') {
    return Promise.reject(new Error('Needs to pass a file url'))
  }
  let response = await fetch(`/config/${filePath}`);
  return response.json();
}