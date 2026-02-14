import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: ':employeeId', component: EmployeeDetailComponent }
];

@NgModule({
  declarations: [EmployeeDetailComponent, EmployeeListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class EmployeeModule {}
