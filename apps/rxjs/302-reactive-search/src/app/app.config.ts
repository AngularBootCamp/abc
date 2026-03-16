import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Turning this to true breaks the cy.clock & cy.tick functionality in the e2e tests...
    provideZoneChangeDetection({ eventCoalescing: false }),
  ],
};
