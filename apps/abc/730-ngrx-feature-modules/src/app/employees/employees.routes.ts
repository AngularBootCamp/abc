import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { EmployeesEffects } from './employees.effects';
import * as fromEmployees from './employees.reducer';

const employeeRoutes: Routes = [
  {
    path: '',
    providers: [
      provideEffects(EmployeesEffects),
      provideState(fromEmployees.employeesFeature)
    ],
    loadComponent: () => import('./employees.component'),
    children: [
      { path: '', redirectTo: 'current', pathMatch: 'full' },
      {
        path: 'current',
        loadComponent: () =>
          import('./current-employees/current-employees.component')
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./new-employees/new-employees.component')
      }
    ]
  }
];

export default employeeRoutes;
