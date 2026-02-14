import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EmployeeLoader } from '../employee-loader.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [RouterLink, AsyncPipe]
})
export default class EmployeeListComponent {
  list = inject(EmployeeLoader).getList();
}
