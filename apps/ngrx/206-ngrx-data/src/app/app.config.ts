import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  DefaultDataServiceConfig,
  HttpUrlGenerator,
  provideEntityData,
  withEffects
} from '@ngrx/data';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { appRoutes } from './app.routes';
import { entityConfig } from './entity-metadata';
import { PluralHttpUrlGenerator } from './plural-http-url-generator';
import { metaReducers, reducers } from './reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideEffects(), // not needed in previous steps, but needed here
    provideEntityData(entityConfig, withEffects()),
    provideRouter(appRoutes),
    provideStore(reducers, { metaReducers }),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 50,
      logOnly: environment.production,
      trace: true
    }),
    // Our server serves authors at /api/authors for all calls,
    // but Data assumes some calls will be at api/author. The
    // generator tells Data to use plural always.
    { provide: HttpUrlGenerator, useClass: PluralHttpUrlGenerator },
    // The default root is 'api', but we need '/api'
    {
      provide: DefaultDataServiceConfig,
      useValue: {
        root: '/api'
      }
    }
  ]
};
