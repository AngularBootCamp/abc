import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideMomentDateAdapter(),
    provideRouter(appRoutes),
    // Not currently taking advantage of any app level ngRx
    provideStore(undefined, {
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    provideStoreDevtools({
      maxAge: 50,
      logOnly: environment.production,
      trace: true
    })
  ]
};
