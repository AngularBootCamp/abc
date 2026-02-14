import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { appRoutes } from './app.routes';
import { reducers, metaReducers } from './reducers';
import { UserProfileEffects } from './user-profile/user-profile.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    provideEffects([UserProfileEffects]),
    provideStoreDevtools({
      maxAge: 50,
      logOnly: environment.production,
      trace: true
    }),
    provideRouter(appRoutes)
  ]
};
