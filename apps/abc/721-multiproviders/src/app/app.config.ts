import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

import { ConsoleLogHandler } from './loggers/console-log-handler';
import { LOG_HANDLERS } from './loggers/log-handler';
import { TelemetryLogHandler } from './loggers/telemetry-log-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: LOG_HANDLERS,
      useClass: ConsoleLogHandler,
      multi: true,
    },
    {
      provide: LOG_HANDLERS,
      useClass: TelemetryLogHandler,
      multi: true,
    },
  ],
};
