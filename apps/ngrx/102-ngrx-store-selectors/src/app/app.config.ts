import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { reducers } from './reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(reducers, {
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        // As of NgRx 9 these runtime checks are turned on by default:
        // strictStateImmutability: true,
        // strictActionImmutability: true
      },
    }),
    provideStoreDevtools({
      maxAge: 50,
      logOnly: environment.production,
      trace: true,
    }),
  ],
};
