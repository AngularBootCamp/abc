import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';
import { provideStore } from '@ngrx/store';

import { reducers } from './reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(reducers, {
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true
        // As of NgRx 9 these runtime checks are turned on by default:
        // strictStateImmutability: true,
        // strictActionImmutability: true
      }
    })
  ]
};
