import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  imports: [RouterLink]
})
export class EmployeeListComponent {
  readonly list = input<Employee[]>([]);
  readonly selectedId = input<number>();
}
