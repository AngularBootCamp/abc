import { Component, output, input } from '@angular/core';

import { Employee } from './interfaces';

@Component({
  selector: 'app-employee-base',
  template: ''
})
export class EmployeeComponent {
  readonly employees = input.required<Employee[]>();
  readonly selectEmp = output<Employee>();

  heading = 'Employees';

  selectEmployee(employee: Employee) {
    this.selectEmp.emit(employee);
  }
}
