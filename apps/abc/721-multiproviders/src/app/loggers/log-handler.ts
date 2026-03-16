import { InjectionToken } from '@angular/core';

export abstract class LogHandler {
  abstract log(message: string): void;
}

export const LOG_HANDLERS = new InjectionToken<LogHandler[]>(
  'LogHandlers',
);
