import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding
} from '@angular/router';

import { appRoutes } from './app.routes';
import { CONSTELLATION_LOADER_CONFIG } from './types';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    {
      provide: CONSTELLATION_LOADER_CONFIG,
      useValue: {
        // Hosted API server
        endpoint: 'https://api.angularbootcamp.com/constellations'

        // Local API server
        // endpoint: '/api/constellations',
      }
    }
  ]
};
