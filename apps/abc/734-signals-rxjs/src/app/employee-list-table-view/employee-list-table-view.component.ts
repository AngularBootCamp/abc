import { Component, output, input } from '@angular/core';

import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list-table-view',
  templateUrl: './employee-list-table-view.component.html',
  styleUrl: './employee-list-table-view.component.scss'
})
export class EmployeeListTableViewComponent {
  readonly list = input<Employee[]>([]);
  readonly selectedId = input<number | null>(null);
  readonly selectId = output<number>();
}
