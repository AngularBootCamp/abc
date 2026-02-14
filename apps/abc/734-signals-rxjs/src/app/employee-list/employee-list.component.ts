import {
  Component,
  computed,
  signal,
  Signal,
  inject
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith, switchMap } from 'rxjs';

import { Employee } from '../employee';
import { EmployeeDetailComponent } from '../employee-detail-view/employee-detail-view.component';
import { EmployeeListTableViewComponent } from '../employee-list-table-view/employee-list-table-view.component';
import { EmployeeLoaderService } from '../employee-loader.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  imports: [
    EmployeeListTableViewComponent,
    EmployeeDetailComponent,
    ReactiveFormsModule
  ]
})
export class EmployeeListComponent {
  // We make sure that the sort options will always have a value
  // that is the name of a property on Employee
  sortCriteria: { display: string; value: keyof Employee }[] = [
    { display: 'Last Name', value: 'lastName' },
    { display: 'Hours Worked', value: 'hoursWorked' }
  ];
  nameFilter = new FormControl('', { nonNullable: true });
  // We tell TypeScript that the value of this will always be a
  // property of Employee, which works because of the types of
  // sortCriteria
  sort = new FormControl<keyof Employee>(this.sortCriteria[0].value, {
    nonNullable: true
  });

  filteredList: Signal<Employee[]>;
  selectedId = signal<number | null>(null);
  selectedEmployee: Signal<Employee | undefined>;

  constructor() {
    const loader = inject(EmployeeLoaderService);

    // .valueChanges is missing the initial value; add it:
    const rawList = toSignal(
      this.nameFilter.valueChanges.pipe(
        startWith(this.nameFilter.value),
        debounceTime(250),
        switchMap(x => loader.getList(x))
      ),
      { initialValue: [] }
    );

    const sortKey = toSignal(this.sort.valueChanges, {
      initialValue: this.sort.value
    });

    // List reacts to filter and sort changes
    this.filteredList = computed(() =>
      rawList().sort(propertyComparator(sortKey()))
    );

    // Detail reacts to selected employee changes
    this.selectedEmployee = toSignal(
      toObservable(this.selectedId).pipe(
        switchMap(id => loader.getDetails(id))
      )
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
