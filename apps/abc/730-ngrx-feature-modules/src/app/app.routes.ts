import { ExtraOptions, Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.routes')
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./user-profile/user-profile.component')
  }
];

export const config: ExtraOptions = {
  useHash: true,
  scrollPositionRestoration: 'enabled'
};
