import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list-table-view',
  templateUrl: './employee-list-table-view.component.html',
  styleUrl: './employee-list-table-view.component.scss',
  imports: [MatTableModule]
})
export class EmployeeListTableViewComponent {
  @Input({ required: true }) list!: Employee[];
  @Input({ required: true }) selectedId: number | undefined;
  @Output() selectId = new EventEmitter<number>();

  tableColumns = ['firstName', 'lastName', 'hourlyWage'];
}
