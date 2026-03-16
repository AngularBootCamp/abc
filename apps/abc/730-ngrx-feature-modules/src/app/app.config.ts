import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { appRoutes } from './app.routes';
import { metaReducers, reducers } from './reducers';
import { UserProfileEffects } from './user-profile/user-profile.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideStore(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
    provideEffects([UserProfileEffects]),
    provideStoreDevtools({
      maxAge: 50,
      logOnly: environment.production,
      trace: true,
    }),
    provideRouter(appRoutes),
  ],
};
