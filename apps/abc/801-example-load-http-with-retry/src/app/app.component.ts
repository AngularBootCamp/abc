import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, Subject, filter, map, share, tap } from 'rxjs';

import { Employee } from './employee';
import { EmployeeDisplayComponent } from './employee-display.component';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeLoader } from './employeeLoader';
import { faulty } from './loader/faulty';
import {
  LoadResultStatus,
  loadWithRetry,
  statusStrings
} from './loader/loadWithRetry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    EmployeeListComponent,
    EmployeeDisplayComponent,
    AsyncPipe
  ]
})
export class AppComponent {
  selectedEmployee: Observable<Employee | undefined>;
  status: Observable<string>;
  selectedEmployeeId = new Subject<number>();
  employees: Observable<Employee[]>;
  showEmployeeDetails: Observable<boolean>;

  constructor() {
    const employeeLoader = inject(EmployeeLoader);

    this.employees = employeeLoader.getList();

    const loadResults = loadWithRetry(
      this.selectedEmployeeId,
      id => employeeLoader.getDetails(id).pipe(faulty<Employee>()) // add this to simulate bad connection
    ).pipe(share());

    this.status = loadResults.pipe(
      tap(result =>
        console.log('RECEIVED', result, 'at', new Date())
      ),
      map(result => statusStrings[result.status])
    );

    this.showEmployeeDetails = loadResults.pipe(
      map(result => result.status === LoadResultStatus.Success)
    );

    this.selectedEmployee = loadResults.pipe(
      filter(result => result.status === LoadResultStatus.Success),
      map(result => result.payload)
    );
  }
}
