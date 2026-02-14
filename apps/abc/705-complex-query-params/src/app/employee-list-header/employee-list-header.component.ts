import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

import { TableOptions } from '../employees.service';

@Component({
  selector: 'app-employee-list-header',
  templateUrl: './employee-list-header.component.html',
  styleUrl: './employee-list-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListHeaderComponent {
  public readonly propertyName = input.required<string>();
  public readonly display = input.required<string>();
  public readonly options = input.required<
    TableOptions | undefined
  >();
  public readonly clicked = output<string>();
}
