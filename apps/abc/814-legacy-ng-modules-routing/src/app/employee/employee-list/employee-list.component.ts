import { Component, inject } from '@angular/core';

import { EmployeeLoader } from '../employee-loader.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  standalone: false
})
export class EmployeeListComponent {
  list = inject(EmployeeLoader).getList();
}
