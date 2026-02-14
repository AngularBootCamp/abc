import { ApplicationConfig } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { AppEffects } from './app.effects';
import { HomeTasksEffects } from './home-tasks.effects';
import { reducers } from './reducers';
import { WorkTasksEffects } from './work-tasks.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(reducers, {
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    provideEffects([AppEffects, HomeTasksEffects, WorkTasksEffects]),
    provideStoreDevtools({
      maxAge: 50,
      logOnly: environment.production,
      trace: true
    })
  ]
};
