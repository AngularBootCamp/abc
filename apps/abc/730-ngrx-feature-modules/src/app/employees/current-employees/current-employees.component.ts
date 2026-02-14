import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { EmployeeDisplayComponent } from '../employee-display/employee-display.component';
import * as EmployeesSelectors from '../employees.selectors';

@Component({
  selector: 'app-current-employees',
  templateUrl: './current-employees.component.html',
  imports: [EmployeeDisplayComponent, AsyncPipe]
})
export default class CurrentEmployeesComponent {
  employeeList = inject(Store).select(
    EmployeesSelectors.selectCurrentEmployees
  );
}
