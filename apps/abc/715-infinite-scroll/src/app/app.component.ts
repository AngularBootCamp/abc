import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EmployeesComponent } from './employees/employees.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [EmployeesComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
