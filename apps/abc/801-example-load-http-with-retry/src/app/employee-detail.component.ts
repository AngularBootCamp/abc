import { Component, input } from '@angular/core';

import { Employee } from './employee';
import { EmployeeDisplayComponent } from './employee-display.component';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  imports: [EmployeeDisplayComponent]
})
export class EmployeeDetailComponent {
  readonly employee = input.required<Employee | undefined>();
}
