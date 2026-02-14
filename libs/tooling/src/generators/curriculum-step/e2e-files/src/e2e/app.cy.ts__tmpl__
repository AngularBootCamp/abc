import {
  appTestName,
  appNameNavDisplay
} from '@class-materials/shared/e2e/helpers';

import { getNavAppTitle } from '../support/app.po';

describe(appTestName(), () => {
  beforeEach(() => cy.visit('/'));

  it('should display app title', () => {
    getNavAppTitle().contains(`${appNameNavDisplay()}`);
  });
});
