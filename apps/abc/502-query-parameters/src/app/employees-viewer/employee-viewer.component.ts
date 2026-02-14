import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';

import { Employee } from '../employee';
import { EmployeeDetailComponent } from '../employee-detail-view/employee-detail-view.component';
import { EmployeeFilterComponent } from '../employee-filter/employee-filter.component';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeLoaderService } from '../employee-loader.service';

@Component({
  selector: 'app-employee-viewer',
  templateUrl: './employee-viewer.component.html',
  styleUrl: './employee-viewer.component.scss',
  imports: [
    EmployeeFilterComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class EmployeeViewerComponent {
  protected readonly filteredList: Observable<Employee[]>;
  protected readonly selectedEmployee: Observable<
    Employee | undefined
  >;

  constructor() {
    const employeeLoader = inject(EmployeeLoaderService);
    const route = inject(ActivatedRoute);

    this.filteredList = route.queryParamMap.pipe(
      map(params => params.get('employeeFilter')),
      switchMap(filter => employeeLoader.getList(filter ?? ''))
    );

    this.selectedEmployee = route.queryParamMap.pipe(
      map(params => params.get('employeeId')),
      switchMap(id => {
        if (id) {
          return employeeLoader.getDetails(id);
        } else {
          return of(undefined);
        }
      })
    );
  }
}
