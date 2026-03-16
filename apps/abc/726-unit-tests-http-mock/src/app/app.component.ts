/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection
-- This older unit testing example assumes zone.js and Default CDS
*/
import { Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';

import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AsyncPipe],
})
export class AppComponent {
  protected readonly team = inject(EmployeeService).getList();
}
