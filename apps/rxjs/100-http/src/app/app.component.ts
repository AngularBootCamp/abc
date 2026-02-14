import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { HeaderComponent } from '@class-materials/shared/ui-page-header';

import {
  Employee,
  EmployeeLoaderService
} from './employee-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HeaderComponent, MatCardModule, MatListModule]
})
export class AppComponent {
  employeeData: Employee[] = [];

  constructor() {
    inject(EmployeeLoaderService)
      .loadEmployees()
      .subscribe((data: Employee[]) => (this.employeeData = data));
  }
}
