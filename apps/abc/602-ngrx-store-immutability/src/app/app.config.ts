import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { reducers } from './reducers';

export const appConfig: ApplicationConfig = {
  providers: [
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
