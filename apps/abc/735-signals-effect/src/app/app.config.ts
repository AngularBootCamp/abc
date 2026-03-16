import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
  ],
};
