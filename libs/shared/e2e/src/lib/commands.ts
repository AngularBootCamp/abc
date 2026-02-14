// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    appName(): Chainable<JQuery<HTMLElement>>;
    checkAppNameAndPageTitle(): void;
  }
}

// Simplify the specified app name, project name, or title to make it
// easy to determine if the names and titles are properly related.
//
// For example, the app name "Change Detection Strategies - Why OnPush?"
// and the project name "711-SKIP-change-detection-strategies-why-on-push"
// both normalize to "changedetectionstrategieswhyonpush", so they're
// considered appropriately similar.
//
const normalize = (title: string) => {
  return (
    title
      // Remove leading digits, a dash, and possibly "SKIP-"...
      .replace(/^[0-9.]+-(skip-)?/i, '')
      // ...then remove everything that isn't a digit or a letter...
      .replace(/[^0-9a-z]/gi, '')
      // ...and convert the result to lowercase.
      .toLowerCase()
  );
};

// Get the element containing the application name, via one of the many
// ways it might be specified across different applications.
Cypress.Commands.add('appName', () =>
  cy.get('nav > span, oasis-header h1, nav > h1')
);

// Make sure the application name and the page title are exactly the
// same, and that they're similar to the project name.
Cypress.Commands.add('checkAppNameAndPageTitle', () =>
  cy
    .appName()
    .invoke('text')
    .then(name => {
      const trimmedName = name.trim();
      cy.title().should('eq', trimmedName);
      expect(normalize(trimmedName)).to.equal(
        normalize(Cypress.env()['projectName'])
      );
    })
);
