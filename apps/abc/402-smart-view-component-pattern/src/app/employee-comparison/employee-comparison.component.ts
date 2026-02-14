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
  public readonly theFirstEmployee = input.required<
    Employee | undefined
  >();
  public readonly theSecondEmployee = input.required<
    Employee | undefined
  >();
  public readonly reverse = output<void>();
}
