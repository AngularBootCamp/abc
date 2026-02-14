import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { Store } from '@ngrx/store';

import { EmployeeDisplayComponent } from '../employee-display/employee-display.component';
import { Employee } from '../employee-loader.service';
import { employeesActions } from '../employees.actions';
import * as EmployeesSelectors from '../employees.selectors';

@Component({
  selector: 'app-new-employees',
  templateUrl: './new-employees.component.html',
  imports: [EmployeeDisplayComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class NewEmployeesComponent {
  private readonly store = inject(Store);

  protected readonly newEmpList = this.store.select(
    EmployeesSelectors.selectNewEmployees
  );

  protected ack(employee: Employee) {
    this.store.dispatch(employeesActions.ackEmployee({ employee }));
  }
}
