import { Injectable } from '@angular/core';

import { LogHandler } from './log-handler';

@Injectable()
export class TelemetryLogHandler extends LogHandler {
  log(message: string) {
    console.log('telemetry logger:', message);
  }
}
