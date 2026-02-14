import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Observable,
  Subject,
  concatMap,
  map,
  scan,
  shareReplay,
  startWith
} from 'rxjs';

import { WhenVisibleDirective } from '../when-visible.directive';

import { Employee, EmployeeService } from './employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
  imports: [WhenVisibleDirective, AsyncPipe]
})
export class EmployeesComponent {
  private employeeService = inject(EmployeeService);

  doneLoading: Observable<boolean>;
  private fetchEmployees = new Subject<void>();
  employees: Observable<Employee[]>;

  constructor() {
    const pagedResults = this.fetchEmployees.pipe(
      scan(acc => acc + 1, -1),
      concatMap(page => this.employeeService.loadEmployees(page)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

    this.employees = pagedResults.pipe(
      scan<Employee[], Employee[]>(
        (alreadyLoaded, newlyArrived) => [
          ...alreadyLoaded,
          ...newlyArrived
        ],
        []
      )
    );

    this.doneLoading = pagedResults.pipe(
      map(employees => !employees.length),
      startWith(false)
    );
  }

  loadMore() {
    console.log('Loading...');
    this.fetchEmployees.next();
  }
}
