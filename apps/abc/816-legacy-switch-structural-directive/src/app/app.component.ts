/* eslint-disable @typescript-eslint/no-deprecated, @typescript-eslint/no-restricted-imports
-- This is an example of legacy code
*/
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected n = 0;
  protected food = 'apple';

  protected increment() {
    this.n++;
  }

  protected results() {
    if (this.n > 1 && this.n < 5) {
      return this.n;
    }
    return undefined;
  }
}
