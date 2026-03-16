/* eslint-disable @angular-eslint/prefer-standalone */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h4>Example application with multiple modules</h4>
    <app-payroll-search />
    <app-hr-files-search />
  `,
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
