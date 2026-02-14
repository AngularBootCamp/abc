import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';

import { EmployeeComponent } from './employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent extends EmployeeComponent {
  override heading = signal('Employee List');
}
