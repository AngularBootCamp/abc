import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from '../environments/environment.prod';

import { appRoutes } from './app.routes';
import { reducers } from './reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore(reducers),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 50,
      logOnly: environment.production,
      trace: true
    })
  ]
};
