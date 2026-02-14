import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { HeaderComponent } from '@class-materials/shared/ui-page-header';

import { EmployeeLoaderService } from './employee-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AsyncPipe, HeaderComponent, MatCardModule, MatListModule]
})
export class AppComponent {
  employeeData = inject(EmployeeLoaderService).loadEmployees();
}
