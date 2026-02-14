import { exec } from 'child_process';
import { performance } from 'node:perf_hooks';
import * as path from 'path';
import * as readline from 'readline';

import {
  ExecutorContext,
  PromiseExecutor,
  logger,
  stripIndents
} from '@nx/devkit';
import * as BetterQueue from 'better-queue';
import chokidar from 'chokidar';
import * as fg from 'fast-glob';
import FiveServer from 'five-server';
import {
  Observable,
  filter,
  map,
  groupBy,
  mergeMap,
  debounceTime,
  Subscription
} from 'rxjs';

import { ServeAllExecutorSchema } from './schema';

class ServeAll {
  private readonly projects =
    this.context.projectsConfigurations.projects;

  private readonly appNames = Object.values(this.projects)
    .filter(
      project =>
        project.name !== undefined &&
        project.projectType === 'application' &&
        project.targets?.build &&
        !project.name.toLowerCase().endsWith('-e2e')
    )
    .map(project => project.name)
    .filter(name => name !== undefined)
    .sort();

  private readonly workQueue;
  private readonly subscriptions: Subscription[] = [];
  private readonly prefix;
  private readonly port;
  private readonly concurrent;

  constructor(
    private readonly context: ExecutorContext,
    options: ServeAllExecutorSchema
  ) {
    this.prefix = options.prefix;
    this.port = options.port;
    this.concurrent = options.concurrent;

    this.workQueue = new BetterQueue(
      (task, cb) => this.buildProject(task, cb),
      {
        concurrent: this.concurrent,
        filo: true,
        cancelIfRunning: true
      }
    );

    this.workQueue.on('drain', () =>
      logger.info(' \nAll builds complete. Waiting for changes.')
    );
    this.startDevServer();
    this.enqueueUnBuilt();
    this.rebuildOnChange();
  }

  cleanup() {
    // logger.debug('Cleaning up...');
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }

  async enqueueUnBuilt() {
    const distNames: string[] = fg.sync('*', {
      cwd: `dist/apps/${this.prefix}`,
      deep: 1,
      onlyDirectories: true
    });

    // console.debug({ distNames });

    // TODO: Streamline, DRY
    const unBuiltApps = this.appNames
      .filter(
        name =>
          name &&
          name != 'server' &&
          name != 'tooling' &&
          name.startsWith(this.prefix) &&
          !!this.projects[name].targets?.build &&
          !distNames.find(
            distName => `${this.prefix}-${distName}` === name
          )
      )
      .sort()
      .reverse();

    logger.info(` \nApplications to build: ${unBuiltApps.length}`);

    this.workQueue.pause();
    unBuiltApps.forEach(appName => {
      this.workQueue.push({ id: appName, initial: true });
    });
    this.workQueue.resume();
  }

  projectForChangedFile(filePath: string) {
    const normalizedFilePath = path.normalize(filePath);

    for (const appName of this.appNames) {
      const normalizedRoot = path.normalize(
        this.projects[appName].root
      );
      if (normalizedFilePath.startsWith(normalizedRoot)) {
        return appName;
      }
    }
    return '';
  }

  rebuildOnChange() {
    // TODO: Improve types
    const changes = new Observable<Record<string, string>>(
      observer => {
        const watcher = chokidar.watch(
          [
            `./apps/${this.prefix}`
            // './libs/shared'
          ],
          { ignoreInitial: true }
        );
        watcher.on('all', (event: string, filePath: string) =>
          observer.next({ event, filePath })
        );

        return () => watcher.close();
      }
    );

    this.subscriptions.push(
      changes
        .pipe(
          filter(({ event }) => event === 'change'),
          groupBy(({ filePath }) =>
            this.projectForChangedFile(filePath)
          ),
          mergeMap(projectChanges$ =>
            projectChanges$.pipe(
              debounceTime(500),
              map(() => projectChanges$.key)
            )
          )
        )
        .subscribe(projectName => {
          // logger.debug(` \nChange detected in ${projectName}`);
          this.workQueue.cancel(projectName);
          this.workQueue.push({ id: projectName });
        })
    );

    const distChanges = new Observable<string>(observer => {
      const distWatcher = chokidar.watch(
        [`./dist/apps/${this.prefix}`],
        {
          depth: 0,
          ignoreInitial: true
        }
      );
      distWatcher.on('unlinkDir', path => {
        // logger.debug(`Detected unlinkDir of ${path}`);
        observer.next(path);
      });

      return () => distWatcher.close();
    });

    this.subscriptions.push(
      distChanges.pipe(debounceTime(2000)).subscribe(() => {
        logger.info(
          ` \nChange detected in ./dist/apps/${this.prefix}`
        );
        this.enqueueUnBuilt();
      })
    );
  }

  buildProject(task: any, completedCallback: any) {
    const projectName = task.id;

    logger.info(` \nBuilding ${projectName}...`);

    const start = performance.now();
    const projectNameWithoutPrefix = (projectName as string)
      .toLocaleLowerCase()
      .replace(new RegExp(`^${this.prefix}-`, 'i'), '');

    const command = `
      npx nx build ${projectName}
        --baseHref=/${projectNameWithoutPrefix}/
        --deleteOutputPath=false
        --skipNxCache
        --configuration=development
    `
      .trim()
      .replace(/(\n|[ ])+/g, ' ');

    // logger.debug(command);

    const builder = exec(command);

    builder.on('exit', code => {
      if (code) {
        logger.error(
          ` \n✖ ERROR building ${projectName} (code: ${code})\n `
        );
      } else {
        const milliseconds = performance.now() - start;
        const seconds = (milliseconds / 1000).toFixed(2);
        logger.info(
          ` \n✔ ${projectName} build complete (${seconds}s)`
        );
      }
      completedCallback();
    });

    return {
      cancel: function () {
        logger.info(
          ` \nStopping ${projectName} build in progress...`
        );
        builder.kill('SIGINT'); // control C
      }
    };
  }

  startDevServer() {
    new FiveServer().start({
      port: this.port,
      root: `./dist/apps/${this.prefix}`,
      open: false,
      injectCss: false,
      wait: 300,
      logLevel: 0,
      mount: {
        '/favicon.ico': path.resolve(
          process.cwd(),
          'tools/favicon.ico'
        )
      },
      proxy: {
        '/api': 'http://localhost:8085'
      }
    });

    logger.info(
      `Serving ${this.prefix} applications at http://localhost:${this.port}` +
        '\n \nPress ? for help'
    );
  }
}

const runExecutor: PromiseExecutor<ServeAllExecutorSchema> = async (
  options: ServeAllExecutorSchema,
  context: ExecutorContext
) => {
  const menu = stripIndents`
    q: quit
    r: rebuild
    ?: help
  `;

  return new Promise<{ success: boolean }>(resolve => {
    // Emit keypress events on process.stdin
    readline.emitKeypressEvents(process.stdin);

    // Set stdin to raw mode
    process.stdin.setRawMode(true);

    const sa = new ServeAll(context, options);

    process.stdin.on('keypress', (_ch, key) => {
      switch (true) {
        // Clean up and exit if Q or Ctrl+C is pressed.
        case key.ctrl && key.name === 'c':
        case !key.ctrl && key.name === 'q':
          sa.cleanup();
          resolve({ success: true });
          break;

        case !key.ctrl && key.name === 'r':
          sa.enqueueUnBuilt();
          break;

        // Otherwise display help.
        default:
          logger.info(` \n${menu}`);
      }
    });
  });
};

export default runExecutor;
