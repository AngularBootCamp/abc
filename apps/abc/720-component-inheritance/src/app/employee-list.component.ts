import { Component } from '@angular/core';

import { EmployeeComponent } from './employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent extends EmployeeComponent {
  override heading = 'Employee List';
}
