import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { tap } from 'rxjs';

import { EmployeeComparisonComponent } from '../employee-comparison/employee-comparison.component';
import { EmployeeExplorerComponent } from '../employee-explorer/employee-explorer.component';
import { Employee, EmployeeLoader } from '../employee-loader.service';

@Component({
  templateUrl: './store-comparator.component.html',
  styleUrl: './store-comparator.component.scss',
  imports: [
    EmployeeComparisonComponent,
    EmployeeExplorerComponent,
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class StoreComparatorComponent {
  private readonly el = inject(EmployeeLoader);

  protected readonly easternEmployeeList = this.el
    .getEasternStoreEmployees()
    .pipe(
      tap(list => {
        this.easternEmployee = list[0];
      })
    );

  protected readonly westernEmployeeList = this.el
    .getWesternStoreEmployees()
    .pipe(
      tap(list => {
        this.westernEmployee = list[0];
      })
    );

  protected easternEmployee: Employee | undefined;
  protected westernEmployee: Employee | undefined;

  protected setLeftEmployee(emp: Employee) {
    this.easternEmployee = emp;
  }

  protected setRightEmployee(emp: Employee) {
    this.westernEmployee = emp;
  }
}
