import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideMomentDateAdapter(),
    provideRouter(appRoutes)
  ]
};
