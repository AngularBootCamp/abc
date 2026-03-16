import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Observable } from 'rxjs';

import { Employee, EmployeeLoader } from '../employee-loader.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [RouterLink, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmployeeListComponent {
  protected readonly list: Observable<Employee[]>;

  constructor() {
    const loader = inject(EmployeeLoader);

    this.list = loader.getList();
  }
}
