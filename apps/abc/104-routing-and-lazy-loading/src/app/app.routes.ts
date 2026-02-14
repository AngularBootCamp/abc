import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'hr', pathMatch: 'full' },
  {
    path: 'hr',
    loadComponent: () =>
      import('./hr-files/hr-files-search.component')
  },
  {
    path: 'payroll',
    loadComponent: () => import('./payroll/payroll-search.component')
  }
];
