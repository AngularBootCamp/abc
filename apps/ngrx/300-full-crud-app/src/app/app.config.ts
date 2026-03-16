import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';

import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideMomentDateAdapter(),
    provideRouter(appRoutes),
    // Not currently taking advantage of any app level ngRx
    provideStore(undefined, {
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
    provideStoreDevtools({
      maxAge: 50,
      logOnly: environment.production,
      trace: true,
    }),
  ],
};
