/* eslint-disable @angular-eslint/prefer-standalone */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { EmployeeLoader } from '../employee-loader.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {
  protected readonly list = inject(EmployeeLoader).getList();
}
