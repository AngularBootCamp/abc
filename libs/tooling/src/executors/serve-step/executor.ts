import { ExecutorContext, runExecutor } from '@nx/devkit';

import { ServeStepExecutorSchema } from './schema';

const executorOptionOverrides: Record<string, string | number> = {};

// XXX: Hopefully-temporary workaround to serve applications within
// a devcontainer so that they're visible outside the container.
if (process.env['DEVCONTAINER']) {
  executorOptionOverrides['host'] = '0.0.0.0';
  console.log(
    'Running in devcontainer with executor option overrides',
    executorOptionOverrides
  );
}

// Run just the specified project:target, without the API server.
// (See below for the commented-out previous version.)
export default async function serveStepExecutor(
  options: ServeStepExecutorSchema,
  context: ExecutorContext
) {
  const [projectName, targetName] = options.serveTarget.split(':');
  if (!projectName || !targetName) {
    throw new Error(
      'Unable to compute project name and target name from `serveTarget` option'
    );
  }
  const appResults = await runExecutor(
    {
      project: projectName,
      target: targetName,
      configuration: context.configurationName
    },
    executorOptionOverrides,
    context
  );

  for await (const result of appResults) {
    if (!result.success) {
      return result;
    }
  }
}

// This version of serveStepExecutor runs the API server along
// with the specified project and target.
/* 
export default async function serveStepExecutor(
  options: ServeStepExecutorSchema,
  context: ExecutorContext
) {
  const [projectName, targetName] = options.serveTarget.split(':');
  if (!projectName || !targetName) {
    throw new Error(
      'Unable to compute project name and target name from `serveTarget` option'
    );
  }

  const serverResults = await runExecutor(
    {
      project: 'server',
      target: 'serve',
      configuration: 'development'
    },
    {},
    context
  );

  let serverFirstOutput = true;

  for await (const result of serverResults) {
    if (!result.success) {
      return result;
    }

    if (serverFirstOutput) {
      serverFirstOutput = false;
      const appResults = await runExecutor(
        {
          project: projectName,
          target: targetName,
          configuration: context.configurationName
        },
        executorOptionOverrides,
        context
      );

      for await (const result of appResults) {
        if (!result.success) {
          return result;
        }
      }
    }
  }
}

*/
