import { Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { EmployeeLoaderService } from '../employee-loader.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [MatCardModule, MatListModule, RouterLink, AsyncPipe],
})
export class EmployeeListComponent {
  list = inject(EmployeeLoaderService).getList();
}
