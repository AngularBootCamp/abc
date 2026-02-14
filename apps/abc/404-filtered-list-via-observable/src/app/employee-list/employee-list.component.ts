import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  map,
  startWith,
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
    AsyncPipe,
    EmployeeListTableViewComponent,
    EmployeeDetailComponent,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent {
  // The sort options will always have a value that is the name of a
  // property on Employee.
  protected readonly sortCriteria = signal<
    {
      display: string;
      value: keyof Employee;
    }[]
  >([
    { display: 'Last Name', value: 'lastName' },
    { display: 'Hours Worked', value: 'hoursWorked' }
  ]);

  // Tell TypeScript that the value of this will always be a
  // property of Employee, which works because of the type of
  // sortCriteria.
  protected readonly sort = new FormControl<keyof Employee>(
    this.sortCriteria()[0].value,
    {
      nonNullable: true
    }
  );

  protected readonly nameFilter = new FormControl('', {
    nonNullable: true
  });

  protected readonly filteredList: Observable<Employee[]>;
  protected readonly selectedId = new Subject<number>();
  protected readonly selectedEmployee: Observable<Employee>;

  constructor() {
    const loader = inject(EmployeeLoaderService);

    // .valueChanges is missing the initial value; add it:
    const nameFilter = this.nameFilter.valueChanges.pipe(
      startWith(this.nameFilter.value)
    );

    const sort = this.sort.valueChanges.pipe(
      startWith(this.sort.value)
    );

    // List reacts to filter and sort changes.
    this.filteredList = combineLatest([
      nameFilter.pipe(
        debounceTime(250),
        switchMap(x => loader.getList(x))
      ),
      sort
    ]).pipe(
      // list.sort() mutates the array, so our linter makes sure
      // we are sorting a copy of the original list, to be safe.
      map(([list, sortKey]) =>
        [...list].sort(propertyComparator(sortKey))
      )
    );

    // Detail reacts to selected employee changes.
    this.selectedEmployee = this.selectedId.pipe(
      switchMap(id => loader.getDetails(id))
    );
  }
}

// By using a generic parameter instead of Employee, we create a
// general-purpose comparator. `keyof` makes sure that the value
// passed in is actually the name of a property on the type.
function propertyComparator<T>(key: keyof T) {
  return (a: T, b: T) => {
    if (a[key] < b[key]) {
      return -1;
    } else if (a[key] > b[key]) {
      return 1;
    } else {
      return 0;
    }
  };
}
