import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    // Turning this to true breaks the cy.clock & cy.tick functionality in the e2e tests...
    provideZoneChangeDetection({ eventCoalescing: false })
  ]
};
