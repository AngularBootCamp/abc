import { ApplicationConfig } from '@angular/core';

import { ConsoleLogHandler } from './loggers/console-log-handler';
import { LogHandlers } from './loggers/log-handler';
import { TelemetryLogHandler } from './loggers/telemetry-log-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: LogHandlers,
      useClass: ConsoleLogHandler,
      multi: true
    },
    {
      provide: LogHandlers,
      useClass: TelemetryLogHandler,
      multi: true
    }
  ]
};
