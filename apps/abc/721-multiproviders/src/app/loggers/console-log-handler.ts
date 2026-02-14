import { Injectable } from '@angular/core';

import { LogHandler } from './log-handler';

@Injectable()
export class ConsoleLogHandler extends LogHandler {
  log(message: string) {
    console.log('console logger:', message);
  }
}
