/* eslint-disable @typescript-eslint/no-restricted-imports
-- This is an example of legacy code
*/
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: ':employeeId', component: EmployeeDetailComponent },
];

@NgModule({
  declarations: [EmployeeDetailComponent, EmployeeListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EmployeeModule {}
