/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection
-- This older unit testing example assumes zone.js and Default CDS
*/
import { Component, inject } from '@angular/core';

import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Observable, debounceTime, startWith, switchMap } from 'rxjs';

import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ReactiveFormsModule, AsyncPipe, JsonPipe],
})
export class AppComponent {
  // Note: These properties are only marked public for testing.

  public readonly nameFilter = new FormControl('', {
    nonNullable: true,
  });
  public readonly filteredTeam: Observable<Employee[]>;

  constructor() {
    const sw = inject(EmployeeService);
    this.filteredTeam = this.nameFilter.valueChanges.pipe(
      startWith(this.nameFilter.value as string),
      debounceTime(250),
      switchMap(x => sw.getFilteredList(x)),
    );
  }
}
