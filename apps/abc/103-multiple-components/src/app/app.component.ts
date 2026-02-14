import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HrFilesSearchComponent } from './hr-files/hr-files-search.component';
import { PayrollSearchComponent } from './payroll/payroll-search.component';

@Component({
  selector: 'app-root',
  template: `
    <app-payroll-search />
    <app-hr-files-search />
  `,
  imports: [PayrollSearchComponent, HrFilesSearchComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
