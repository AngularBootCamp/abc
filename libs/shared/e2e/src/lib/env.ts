import { join, basename } from 'path';

export function curriculumCypressEnv(dir: string) {
  let projectName = basename(dir);
  if (projectName === 'cypress') {
    projectName = basename(join(dir, '../'));
  }
  return {
    projectName
  };
}
