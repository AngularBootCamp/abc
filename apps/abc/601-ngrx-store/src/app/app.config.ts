import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';
import { provideStore } from '@ngrx/store';

import { reducers } from './state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(reducers)
  ]
};
