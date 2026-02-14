import { inject, Injectable } from '@angular/core';

import { LogHandlers } from './log-handler';

@Injectable({ providedIn: 'root' })
export class LogService {
  private loggers = inject(LogHandlers);

  log(message: string) {
    this.loggers.forEach(logger => logger.log(message));
  }
}
