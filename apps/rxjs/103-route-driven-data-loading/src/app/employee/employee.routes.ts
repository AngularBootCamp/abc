import { Routes } from '@angular/router';

import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const employeeRoutes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: ':employeeId', component: EmployeeDetailComponent }
];

export default employeeRoutes;
