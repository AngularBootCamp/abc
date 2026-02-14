import { Component, input } from '@angular/core';

import { Employee } from '../employee';

@Component({
  selector: 'app-employee-detail-view',
  templateUrl: './employee-detail-view.component.html'
})
export class EmployeeDetailComponent {
  readonly employee = input<Employee>();
}
