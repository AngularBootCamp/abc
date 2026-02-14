import { InjectionToken } from '@angular/core';

export abstract class LogHandler {
  abstract log(message: string): void;
}

export const LogHandlers = new InjectionToken<LogHandler[]>(
  'LogHandlers'
);
