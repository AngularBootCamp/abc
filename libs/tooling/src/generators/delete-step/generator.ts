import { join } from 'path/posix';

import {
  formatFiles,
  Tree,
  readProjectConfiguration,
  getProjects,
  logger
} from '@nx/devkit';
import { moveGenerator } from '@nx/workspace';

import { DeleteStepGeneratorSchema } from './schema';

export default async function (
  tree: Tree,
  options: DeleteStepGeneratorSchema
) {
  const projectToDeleteConfig = readProjectConfiguration(
    tree,
    options.project
  );

  const projectToDeleteE2EConfig = readProjectConfiguration(
    tree,
    options.project + '-e2e'
  );

  logger.info(`Deleting ${options.project}`);
  tree.delete(projectToDeleteConfig.root);

  if (projectToDeleteE2EConfig) {
    logger.info(`Deleting ${options.project}-e2e`);
    tree.delete(projectToDeleteE2EConfig.root);
  }
  logger.info('');

  const projectToDeleteNameSplit = options.project.split('-');
  const curriculumSet = projectToDeleteNameSplit[0];
  const stepNumber = projectToDeleteNameSplit[1];

  const projects = getProjects(tree);
  const projectNames = Array.from(projects.keys());

  const projectsToReNumber = projectNames.filter(projectName => {
    const projectNameSplit = projectName.split('-');
    const projectCurriculumSet = projectNameSplit[0];
    const projectStepNumber = projectNameSplit[1];
    // Same curriculum set, same group of step numbers, and a higher step number in said group
    return (
      !projectName.endsWith('-e2e') &&
      projectCurriculumSet === curriculumSet &&
      stepNumber.charAt(0) === projectStepNumber.charAt(0) &&
      stepNumber < projectStepNumber
    );
  });

  for (const projectName of projectsToReNumber) {
    const projectNameSplit = projectName.split('-');
    const [
      projectCurriculumSet,
      projectStepNumber,
      ...projectNameRest
    ] = projectNameSplit;
    const newStepNumber = Number(projectStepNumber) - 1;
    const newProjectName = [
      projectCurriculumSet,
      newStepNumber.toString(),
      projectNameRest.join('-')
    ].join('-');

    logger.info(`Renaming ${projectName} -> ${newProjectName}`);
    await moveGenerator(tree, {
      projectName: `${projectName}-e2e`,
      destination: join(
        projectCurriculumSet,
        [newStepNumber.toString(), ...projectNameRest, 'e2e'].join(
          '-'
        )
      ),
      newProjectName: `${projectName}-e2e`,
      updateImportPath: true
    });

    tree.delete(
      join(
        'apps',
        projectCurriculumSet,
        [projectStepNumber, ...projectNameRest].join('-')
      )
    );

    await moveGenerator(tree, {
      projectName,
      destination: join(
        projectCurriculumSet,
        [newStepNumber.toString(), ...projectNameRest].join('-')
      ),
      newProjectName,
      updateImportPath: true
    });

    await moveGenerator(tree, {
      projectName: `${projectName}-e2e`,
      destination: join(
        projectCurriculumSet,
        [newStepNumber.toString(), ...projectNameRest].join('-'),
        'cypress'
      ),
      newProjectName: `${newProjectName}-e2e`,
      updateImportPath: true
    });
  }

  await formatFiles(tree);
}
