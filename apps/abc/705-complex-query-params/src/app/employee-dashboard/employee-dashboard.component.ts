import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { EmployeeFilterComponent } from '../employee-filter/employee-filter.component';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeService } from '../employees.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  imports: [
    EmployeeFilterComponent,
    EmployeeListComponent,
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDashboardComponent {
  private readonly employeeService = inject(EmployeeService);

  protected readonly tableOptions = this.employeeService.tableOptions;
  protected readonly employees = this.employeeService.employees;
}
