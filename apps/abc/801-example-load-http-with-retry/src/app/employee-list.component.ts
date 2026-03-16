import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { Employee } from './employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {
  public readonly employees = input.required<Employee[]>();
  public readonly selectedEmployee = output<number>();
}
