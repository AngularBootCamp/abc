/* eslint-disable @angular-eslint/use-injectable-provided-in
-- Services are provided in app config to illustrate multiproviders
*/
import { Injectable } from '@angular/core';

import { LogHandler } from './log-handler';

@Injectable()
export class ConsoleLogHandler extends LogHandler {
  log(message: string) {
    console.log('console logger:', message);
  }
}
