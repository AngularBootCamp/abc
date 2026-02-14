import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from '../environments/environment.prod';

import { reducers } from './state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(reducers),
    provideStoreDevtools({
      maxAge: 50,
      logOnly: environment.production,
      trace: true
    })
  ]
};
