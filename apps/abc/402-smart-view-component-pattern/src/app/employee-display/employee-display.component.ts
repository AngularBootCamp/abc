import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';

import { Employee } from '../employee-loader.service';

@Component({
  selector: 'app-employee-display',
  templateUrl: './employee-display.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDisplayComponent {
  readonly employee = input.required<Employee | undefined>();
}
