import { Injectable, inject } from '@angular/core';

import { LOG_HANDLERS } from './log-handler';

@Injectable({ providedIn: 'root' })
export class LogService {
  private readonly loggers = inject(LOG_HANDLERS);

  log(message: string) {
    this.loggers.forEach(logger => logger.log(message));
  }
}
