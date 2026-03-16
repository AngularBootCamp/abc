import { Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Observable, map, share, switchMap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import {
  Employee,
  EmployeeLoaderService,
} from '../employee-loader.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  imports: [MatCardModule, MatButtonModule, RouterLink, AsyncPipe],
})
export class EmployeeDetailComponent {
  employee: Observable<Employee>;

  constructor() {
    const route = inject(ActivatedRoute);
    const loader = inject(EmployeeLoaderService);

    this.employee = route.paramMap.pipe(
      map(paramMap => paramMap.get('employeeId') as string),
      switchMap(id => loader.getDetails(id)),
      share(),
    );
  }
}
