import { Component } from '@angular/core';

import { EmployeeComponent } from './employee.component';

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrl: './employee-grid.component.scss'
})
export class EmployeeGridComponent extends EmployeeComponent {}
