/* eslint-disable @angular-eslint/use-injectable-provided-in
-- Service can be provided in different injectors to illustrate hierchical DI
*/
import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  log(message: string): void {
    console.log(message);
  }

  error(message: string): void {
    console.error(message);
  }

  warn(message: string): void {
    console.warn(message);
  }
}
