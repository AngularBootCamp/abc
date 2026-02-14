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
  private el = inject(EmployeeLoader);

  easternEmployeeList = this.el.getEasternStoreEmployees().pipe(
    tap(list => {
      this.easternEmployee = list[0];
    })
  );

  westernEmployeeList = this.el.getWesternStoreEmployees().pipe(
    tap(list => {
      this.westernEmployee = list[0];
    })
  );

  easternEmployee: Employee | undefined;
  westernEmployee: Employee | undefined;

  setLeftEmployee(emp: Employee) {
    this.easternEmployee = emp;
  }
  setRightEmployee(emp: Employee) {
    this.westernEmployee = emp;
  }
}
