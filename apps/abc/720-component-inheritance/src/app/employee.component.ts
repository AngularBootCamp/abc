import {
  Component,
  output,
  input,
  signal,
  ChangeDetectionStrategy
} from '@angular/core';

import { Employee } from './interfaces';

@Component({
  selector: 'app-employee-base',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent {
  public readonly employees = input.required<Employee[]>();
  public readonly selectEmp = output<Employee>();

  protected heading = signal('Employees');

  protected selectEmployee(employee: Employee) {
    this.selectEmp.emit(employee);
  }
}
