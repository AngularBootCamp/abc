import { Component, input, output } from '@angular/core';

import { TableOptions } from '../employees.service';

@Component({
  selector: 'app-employee-list-header',
  templateUrl: './employee-list-header.component.html',
  styleUrl: './employee-list-header.component.scss'
})
export class EmployeeListHeaderComponent {
  readonly propertyName = input.required<string>();
  readonly display = input.required<string>();
  readonly options = input.required<TableOptions | undefined>();

  readonly clicked = output<string>();
}
