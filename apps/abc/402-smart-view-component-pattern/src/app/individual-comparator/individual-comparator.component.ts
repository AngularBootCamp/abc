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
  templateUrl: './individual-comparator.component.html',
  imports: [
    EmployeeComparisonComponent,
    EmployeeExplorerComponent,
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class IndividualComparatorComponent {
  private el = inject(EmployeeLoader);

  employeeList = this.el.getAllEmployees().pipe(
    tap(list => {
      this.comparedEmployees = [list[0], list[1]];
    })
  );

  comparedEmployees: Employee[] = [];

  updateComparison(emp: Employee) {
    this.comparedEmployees = [this.comparedEmployees[0], emp];
  }

  reverseComparison() {
    this.comparedEmployees = [
      this.comparedEmployees[1],
      this.comparedEmployees[0]
    ];
  }
}
