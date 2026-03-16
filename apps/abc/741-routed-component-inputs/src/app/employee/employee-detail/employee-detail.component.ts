import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Observable, share } from 'rxjs';

import { Employee, EmployeeLoader } from '../employee-loader.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  imports: [RouterLink, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmployeeDetailComponent {
  public readonly employeeId = input.required<string>();

  private readonly loader = inject(EmployeeLoader);

  protected employee$: Observable<Employee> | undefined;

  constructor() {
    effect(() => {
      this.employee$ = this.loader
        .getDetails(this.employeeId())
        .pipe(share());
    });
  }
}
