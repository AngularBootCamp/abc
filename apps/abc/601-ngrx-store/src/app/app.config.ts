import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { reducers } from './state';

export const appConfig: ApplicationConfig = {
  providers: [provideStore(reducers)]
};
