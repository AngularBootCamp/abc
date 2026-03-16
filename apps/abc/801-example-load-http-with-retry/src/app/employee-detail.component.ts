import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Employee } from './employee';
import { EmployeeDisplayComponent } from './employee-display.component';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  imports: [EmployeeDisplayComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailComponent {
  public readonly employee = input.required<Employee | undefined>();
}
