import {
  Component,
  output,
  input,
  ChangeDetectionStrategy
} from '@angular/core';

import { EmployeeDisplayComponent } from '../employee-display/employee-display.component';
import { Employee } from '../employee-loader.service';

@Component({
  selector: 'app-employee-comparison',
  templateUrl: './employee-comparison.component.html',
  styleUrl: './employee-comparison.component.scss',
  imports: [EmployeeDisplayComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComparisonComponent {
  readonly theFirstEmployee = input.required<Employee | undefined>();
  readonly theSecondEmployee = input.required<Employee | undefined>();
  readonly reverse = output<void>();
}
