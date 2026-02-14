import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { sortBy } from 'lodash-es';
import {
  combineLatest,
  debounceTime,
  map,
  Observable,
  startWith,
  Subject,
  switchMap
} from 'rxjs';

import { Employee } from '../employee';
import { EmployeeDetailComponent } from '../employee-detail-view/employee-detail-view.component';
import { EmployeeListTableViewComponent } from '../employee-list-table-view/employee-list-table-view.component';
import { EmployeeLoaderService } from '../employee-loader.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    EmployeeListTableViewComponent,
    EmployeeDetailComponent,
    AsyncPipe
  ]
})
export class EmployeeListComponent {
  nameFilter = new FormControl('', { nonNullable: true });
  sort = new FormControl('lastName', { nonNullable: true });

  filteredList: Observable<Employee[]>;
  selectedId = new Subject<number>();
  selectedEmployee: Observable<Employee>;

  constructor() {
    const loader = inject(EmployeeLoaderService);

    // .valueChanges is missing the initial value; add it:
    const nameFilter = this.nameFilter.valueChanges.pipe(
      startWith<string>(this.nameFilter.value)
    );

    const sort = this.sort.valueChanges.pipe(
      startWith<string>(this.sort.value)
    );

    // List reacts to filter and sort changes
    this.filteredList = combineLatest([
      nameFilter.pipe(
        debounceTime(250),
        switchMap(x => loader.getList(x))
      ),
      sort
    ]).pipe(map(([list, sortKey]) => sortBy(list, sortKey)));

    // Detail reacts to selected employee changes
    this.selectedEmployee = this.selectedId.pipe(
      switchMap(id => loader.getDetails(id))
    );
  }
}
