import {
  Component,
  output,
  input,
  ChangeDetectionStrategy
} from '@angular/core';

import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list-table-view',
  templateUrl: './employee-list-table-view.component.html',
  styleUrl: './employee-list-table-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListTableViewComponent {
  readonly list = input.required<Employee[]>();
  readonly selectedId = input.required<number | null>();
  readonly selectId = output<number>();
}
