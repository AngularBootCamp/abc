import { Routes } from '@angular/router';

const employeeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./employee-list/employee-list.component')
  },
  {
    path: ':employeeId',
    loadComponent: () =>
      import('./employee-detail/employee-detail.component')
  }
];

export default employeeRoutes;
