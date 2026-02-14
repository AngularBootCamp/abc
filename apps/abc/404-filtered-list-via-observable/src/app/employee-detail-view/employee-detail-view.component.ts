import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';

import { Employee } from '../employee';

@Component({
  selector: 'app-employee-detail-view',
  templateUrl: './employee-detail-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailComponent {
  readonly employee = input.required<Employee | undefined>();
}
