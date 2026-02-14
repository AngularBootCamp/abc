import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, share, switchMap } from 'rxjs';

import { Employee, EmployeeLoader } from '../employee-loader.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  standalone: false
})
export class EmployeeDetailComponent {
  employee: Observable<Employee>;

  constructor() {
    const route = inject(ActivatedRoute);
    const loader = inject(EmployeeLoader);

    this.employee = route.paramMap.pipe(
      map(paramMap => paramMap.get('employeeId') as string),
      switchMap(id => loader.getDetails(id)),
      share()
    );
  }
}
