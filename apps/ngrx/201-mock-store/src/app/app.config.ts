import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from '../environments/environment.prod';

import { appRoutes } from './app.routes';
import { reducers } from './reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore(reducers),
    provideStoreDevtools({
      maxAge: 50,
      logOnly: environment.production,
      trace: true,
    }),
  ],
};
