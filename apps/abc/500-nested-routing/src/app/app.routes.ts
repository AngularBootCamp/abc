import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'payroll', pathMatch: 'full' },
  {
    path: 'hr',
    loadComponent: () =>
      import('./hr-files/hr-files-search.component')
  },
  {
    path: 'payroll',
    loadChildren: () => import('./payroll/payroll.routes')
  }
];
