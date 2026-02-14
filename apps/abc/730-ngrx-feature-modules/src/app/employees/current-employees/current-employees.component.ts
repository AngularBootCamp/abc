import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { Store } from '@ngrx/store';

import { EmployeeDisplayComponent } from '../employee-display/employee-display.component';
import * as EmployeesSelectors from '../employees.selectors';

@Component({
  selector: 'app-current-employees',
  templateUrl: './current-employees.component.html',
  imports: [EmployeeDisplayComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CurrentEmployeesComponent {
  protected readonly employeeList = inject(Store).select(
    EmployeesSelectors.selectCurrentEmployees
  );
}
