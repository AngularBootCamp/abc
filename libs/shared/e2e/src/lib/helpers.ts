export const appTestName = () =>
  'Step: ' + Cypress.env()['projectName'];

export const appNameNavDisplay = () => {
  const appNameNavDisplayPartial = Cypress.env()
    ['projectName'].replace(/^[0-9?.]*-(skip-)?/i, '')
    .replace(/-./g, (x: string[]) => ' ' + x[1].toUpperCase());
  return (
    appNameNavDisplayPartial?.at(0)?.toUpperCase() +
    appNameNavDisplayPartial?.slice(1)
  );
};
