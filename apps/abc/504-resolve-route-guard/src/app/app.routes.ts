import { Routes } from '@angular/router';

import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeResolver } from './employee.resolver';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  {
    path: 'employee/:employeeId',
    component: EmployeeDetailComponent,
    resolve: { employee: EmployeeResolver }
  }
];
