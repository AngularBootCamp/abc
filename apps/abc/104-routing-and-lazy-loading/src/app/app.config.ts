import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes
      // Log routing events to the console:
      // withDebugTracing()

      // Automatically preload lazy-loaded routes:
      // withPreloading(PreloadAllModules)

      // Many other options:
      // https://angular.dev/api/router/RouterFeatures
    )
  ]
};
