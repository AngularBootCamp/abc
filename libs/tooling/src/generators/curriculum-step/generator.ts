import { join } from 'path/posix';

import {
  E2eTestRunner,
  applicationGenerator
} from '@nx/angular/generators';
import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
  updateProjectConfiguration,
  readProjectConfiguration,
  TargetConfiguration,
  joinPathFragments
} from '@nx/devkit';
import { Linter } from '@nx/eslint';
import { moveGenerator } from '@nx/workspace';

import { ToolingGeneratorSchema } from './schema';

const curriculumSets = ['abc', 'rxjs', 'ngrx'];

interface NormalizedSchema extends ToolingGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  appTitle: string;
  hasWorkshop: boolean;
}

function normalizeOptions(
  tree: Tree,
  options: ToolingGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = `${names(options.class).fileName}/${name}`;
  const projectName = projectDirectory.replace(
    new RegExp('/', 'g'),
    '-'
  );
  const projectRoot = `${
    getWorkspaceLayout(tree).appsDir
  }/${projectDirectory}`;
  const appTitlePartial = (
    name
      .split('\\')
      .find(pathSegment => /[0-9]/.test(pathSegment)) as string
  )
    .replace(/[0-9]*-/, '')
    .replace(/-./g, x => ' ' + x[1].toUpperCase());
  const appTitle =
    appTitlePartial?.at(0)?.toUpperCase() + appTitlePartial?.slice(1);

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    appTitle,
    hasWorkshop: options.includeWorkshop ?? false
  };
}

function addFiles(
  tree: Tree,
  options: NormalizedSchema,
  filesFolder: string,
  projectRoot?: string
) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    tmpl: ''
  };
  generateFiles(
    tree,
    joinPathFragments(__dirname, filesFolder),
    projectRoot ? projectRoot : options.projectRoot,
    templateOptions
  );
}

export default async function (
  tree: Tree,
  options: ToolingGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(tree, options);

  await applicationGenerator(tree, {
    name: normalizedOptions.projectName,
    prefix: 'app',
    style: 'scss',
    skipTests: true,
    directory: normalizedOptions.projectRoot,
    linter: Linter.EsLint,
    strict: true,
    port: 4300,
    standalone: true,
    e2eTestRunner: E2eTestRunner.Cypress,
    bundler: 'esbuild'
  });

  const projectConfiguration = readProjectConfiguration(
    tree,
    normalizedOptions.projectName
  );

  // Need to update the assets globbing, stylePreprocessorOptions, and styles
  // in the Build Target's Options
  let buildTarget = projectConfiguration.targets
    ?.build as TargetConfiguration<{
    assets: (
      | string
      | { glob: string; input: string; output: string }
    )[];
    stylePreprocessorOptions: { includePaths: string[] };
    styles: string[];
  }>;

  const matchingCurriculumStep = curriculumSets.find(
    curriculumSet => curriculumSet === normalizedOptions.class
  );

  if (buildTarget.options) {
    const buildOptions = buildTarget.options;
    buildTarget = {
      ...buildTarget,
      options: {
        ...buildOptions,
        assets: [
          ...buildOptions.assets,
          ...(matchingCurriculumStep
            ? [
                {
                  glob: '**/*',
                  input: `libs/shared/assets/${matchingCurriculumStep}`,
                  output: '/assets/'
                }
              ]
            : []),
          {
            glob: '**/*',
            input: 'libs/shared/assets/shared',
            output: '/assets/'
          }
        ],
        stylePreprocessorOptions: {
          includePaths: [
            ...(matchingCurriculumStep
              ? [`libs/shared/styles/${matchingCurriculumStep}`]
              : []),
            'libs/shared/styles/shared',
            'node_modules/@angular/material'
          ]
        },
        styles: [
          ...buildOptions.styles,
          ...(matchingCurriculumStep
            ? [
                `libs/shared/styles/${matchingCurriculumStep}/shared.scss`
              ]
            : []),
          'libs/shared/styles/shared/shared.scss'
        ]
      }
    };
  }

  // Need to update the proxyConfig in Serve Target's Options
  let serveTarget = projectConfiguration.targets
    ?.serve as TargetConfiguration<{
    proxyConfig: string;
  }>;

  if (serveTarget.options) {
    const serveOptions = serveTarget.options;
    serveTarget = {
      ...serveTarget,
      options: {
        ...serveOptions,
        proxyConfig: 'proxy.conf.json'
      }
    };
  }

  updateProjectConfiguration(tree, normalizedOptions.projectName, {
    ...projectConfiguration,
    targets: {
      ...projectConfiguration.targets,
      build: buildTarget,
      ['ng-serve']: serveTarget,
      serve: {
        executor: '@class-materials/tooling:serve-step',
        options: {
          serveTarget: `${normalizedOptions.projectName}:ng-serve`
        }
      }
    }
  });

  addFiles(tree, normalizedOptions, 'files');
  if (normalizedOptions.includeWorkshop) {
    addFiles(tree, normalizedOptions, 'workshop-files');
  }

  const nxSplashScreenComponentPath = joinPathFragments(
    normalizedOptions.projectRoot,
    'src',
    'app',
    'nx-welcome.component.ts'
  );
  if (tree.isFile(nxSplashScreenComponentPath)) {
    tree.delete(nxSplashScreenComponentPath);
  }

  await moveGenerator(tree, {
    projectName: `${normalizedOptions.projectName}-e2e`,
    newProjectName: `${normalizedOptions.projectName}-e2e`,
    destination: `${normalizedOptions.projectRoot}/cypress`,
    updateImportPath: true
  });

  addFiles(
    tree,
    normalizedOptions,
    'e2e-files',
    join(normalizedOptions.projectRoot, 'cypress')
  );

  const cypressConfiguration = readProjectConfiguration(
    tree,
    `${normalizedOptions.projectName}-e2e`
  );

  // Swap the default `serve` end-point to our new `ng-serve`
  // The reason for this is that the e2e executor hangs on our nx run-commands executor...
  // The api server will have to be run manually for e2e
  const updatedCypressConfiguration = JSON.parse(
    JSON.stringify(cypressConfiguration).replace(
      /:serve/g,
      ':ng-serve'
    )
  );

  updateProjectConfiguration(
    tree,
    `${normalizedOptions.projectName}-e2e`,
    updatedCypressConfiguration
  );

  await formatFiles(tree);
}
