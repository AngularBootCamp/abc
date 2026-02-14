import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EmployeeListComponent } from './employee-list/employee-list.component';

@Component({
  selector: 'app-root',
  template: '<app-employee-list/>',
  imports: [EmployeeListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
