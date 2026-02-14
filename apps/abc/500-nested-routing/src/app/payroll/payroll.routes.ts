import { Routes } from '@angular/router';

import { PayrollScreenComponent } from './payroll-screen.component';
import { PayrollSearchComponent } from './payroll-search/payroll-search.component';

const payrollRoutes: Routes = [
  {
    path: '',
    component: PayrollScreenComponent,
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      {
        path: 'search',
        component: PayrollSearchComponent
      },
      // Note that it's possible to mix directly-loaded components
      // with lazily-loaded components
      {
        path: 'report',
        loadComponent: () =>
          import('./payroll-report/payroll-report.component')
      }
    ]
  }
];

export default payrollRoutes;
