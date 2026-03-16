/* eslint-disable @angular-eslint/prefer-standalone */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-non-standalone',
  template: `
    <p>
      Because I'm not standalone, I was loaded immediately, even though my
      display was deferred.
    </p>
  `,
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonStandaloneComponent {}
