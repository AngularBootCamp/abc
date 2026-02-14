// Our special "ng serve" substitute that serves all the applications in
// a single curriculum (abc, rxjs, etc.) at the same time.

const { Observable } = require('rxjs');
const {
  filter,
  map,
  groupBy,
  mergeMap,
  debounceTime
} = require('rxjs/operators');

const FiveServer = require('five-server').default;
const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');
const fg = require('fast-glob');
const fs = require('fs');
const BetterQueue = require('better-queue');

// Config ref data

const {
  readWorkspaceConfig
} = require('../../node_modules/nx/src/project-graph/file-utils');

const workspaceConfig = readWorkspaceConfig({
  format: 'nx'
});
const appNames = Object.keys(workspaceConfig.projects).filter(
  project =>
    workspaceConfig.projects[project].projectType === 'application' &&
    !project.endsWith('-e2e')
);
const prefix = process.argv[2] || '';

// Auto build

const workQueue = new BetterQueue(buildProject, {
  concurrent: 1,
  filo: true,
  cancelIfRunning: true
});

workQueue.on('drain', () =>
  console.log('All builds complete, awaiting next change')
);

async function enqueueUnBuilt() {
  const distNames = await fg(['*'], {
    cwd: `dist/apps/${prefix}`,
    onlyDirectories: true
  });

  let unBuiltApps = appNames
    .filter(
      name =>
        !distNames.find(distName => `${prefix}-${distName}` === name)
    )
    .filter(name => name.startsWith(prefix))
    .filter(name => name != 'server')
    .filter(name => {
      let project = workspaceConfig.projects[name];
      if (typeof project === 'string') {
        // New workspace, separate configurations
        project = JSON.parse(
          fs.readFileSync(project + '/project.json')
        );
      }
      // Only buildable projects
      return !!project.architect?.build || !!project.targets?.build;
    });

  unBuiltApps.sort();
  unBuiltApps.reverse();
  console.log(
    'Un-built apps that need to be built:',
    unBuiltApps.length
  );

  workQueue.pause();
  unBuiltApps.forEach((appName, i) =>
    workQueue.push({ id: appName, initial: true })
  );
  workQueue.resume();
}

function projectForChangedFile(filePath) {
  const normalizedFilePath = path.normalize(filePath);

  for (const appName of appNames) {
    const normalizedRoot = path.normalize(
      workspaceConfig.projects[appName].root
    );
    if (normalizedFilePath.startsWith(normalizedRoot)) {
      return appName;
    }
  }
  return '';
}

function rebuildOnChange() {
  const changes = new Observable(function (observer) {
    const watcher = chokidar.watch([`./apps/${prefix}`], './libs/');
    watcher.on('all', (event, filePath) =>
      observer.next({ event, filePath })
    );
    return () => watcher.unwatch();
  });

  changes
    .pipe(
      filter(({ event }) => event === 'change'),
      groupBy(({ filePath }) => projectForChangedFile(filePath)),
      mergeMap(projectChanges$ =>
        projectChanges$.pipe(
          debounceTime(1000),
          map(() => projectChanges$.key)
        )
      )
    )
    .subscribe(projectName => {
      console.log('Change detected on project: ' + projectName);
      workQueue.cancel(projectName);
      workQueue.push({ id: projectName });
    });
}

function buildProject(task, completedCallback) {
  const projectName = task.id;
  console.log(projectName, 'Building');
  console.time(projectName);
  const projectNameWithoutPrefix = projectName.replace(
    `${prefix}-`,
    ''
  );

  const command = [
    'npx',
    'nx',
    'build',
    projectName,
    `--baseHref=/${projectNameWithoutPrefix}/`,
    '--deleteOutputPath=false',
    '--skip-nx-cache',
    '--configuration=development'
  ].join(' ');
  const builder = exec(command);

  builder.on('exit', code => {
    if (code) {
      console.error('BUILD FAILED!', code);
    } else {
      console.timeEnd(projectName);
    }
    completedCallback();
  });

  return {
    cancel: function () {
      console.log('stopping build in progress');
      builder.kill('SIGINT'); // control C
    }
  };
}

// Start the JSON API Server

function startApiServer() {
  const command = ['npx', 'nx', 'serve', 'server'].join(' ');
  const builder = exec(command);

  builder.on('exit', code => {
    if (code) {
      console.error(
        'Serve stopped running. Closed with error:',
        code
      );
    } else {
      console.log('Serve stopped running. Closed successfully');
    }
  });

  console.log('API server started on: http://localhost:8085');
}

// Serve files

function startLiveServer() {
  const port = 8080;
  new FiveServer().start({
    port,
    root: `./dist/apps/${prefix}`,
    open: false,
    noCssInject: true,
    wait: 300,
    logLevel: 0,
    mount: {
      '/favicon.ico': path.resolve(process.cwd(), 'tools/favicon.ico')
    },
    proxy: { '/api': 'http://localhost:8085' }
  });
  console.log(
    'Development web server listening on:',
    `http://localhost:${port}`
  );
  console.log();
}

startApiServer();
startLiveServer();
enqueueUnBuilt();
rebuildOnChange();

// TODO: the old OD fork of live-server had an enhancement to only reload
// if the specific example was edited. Reimplement that on
// Five-server (with a fork or patch).
