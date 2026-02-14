import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { EmployeeListHeaderComponent } from '../employee-list-header/employee-list-header.component';
import { Employee, TableOptions } from '../employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [EmployeeListHeaderComponent, RouterLink]
})
export class EmployeeListComponent {
  private router = inject(Router);

  readonly employees = input.required<Employee[]>();
  readonly options = input.required<TableOptions | undefined>();

  headers = [
    {
      propertyName: 'firstName',
      display: 'First Name'
    },
    {
      propertyName: 'lastName',
      display: 'Last Name'
    },
    {
      propertyName: 'hoursWorked',
      display: 'Hours Worked'
    },
    {
      propertyName: 'hourlyWage',
      display: 'Hourly Wage'
    }
  ];

  headerClicked(sortBy: string) {
    const options = this.options();
    if (options?.sortBy === sortBy) {
      this.changeDirection(options);
    } else {
      const queryParams = { sortBy, sortDirection: undefined };
      void this.router.navigate([], {
        queryParams,
        queryParamsHandling: 'merge'
      });
    }
  }

  private changeDirection(options: TableOptions) {
    const sortDirection =
      options.sortDirection === 'asc' ? 'desc' : 'asc';
    const queryParams = { sortDirection };
    void this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge'
    });
  }
}
