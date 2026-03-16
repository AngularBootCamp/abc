import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EmployeeComponent } from './employee.component';

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrl: './employee-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeGridComponent extends EmployeeComponent {}
