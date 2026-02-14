import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';

import { HeaderComponent } from '@class-materials/shared/ui-page-header';

import { Employee, EmployeesService } from './employees.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AsyncPipe, HeaderComponent, MatCardModule, MatListModule]
})
export class AppComponent {
  employees: Observable<Employee[]>;

  constructor() {
    const es = inject(EmployeesService);

    // this.employees = es.getEmployees();
    // this.employees = es.poll1();
    this.employees = es.poll2();
  }
}
