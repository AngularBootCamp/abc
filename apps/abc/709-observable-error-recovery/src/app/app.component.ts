import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-root',
  template: `
    <h3>Employees</h3>
    @if (employees | async; as employeeList) {
      <ul>
        @for (e of employeeList; track e.id) {
          <li>{{ e.firstName }} {{ e.lastName }}</li>
        }
      </ul>
    }
  `,
  imports: [AsyncPipe]
})
export class AppComponent {
  employees = inject(EmployeesService).pollEmployees();
}
