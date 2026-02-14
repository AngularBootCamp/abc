import { Component, input, output } from '@angular/core';

import { Employee } from './employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent {
  readonly employees = input.required<Employee[]>();
  readonly selectedEmployee = output<number>();
}
