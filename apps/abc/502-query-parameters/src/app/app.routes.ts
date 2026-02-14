import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./employees-viewer/employee-viewer.component')
  }
];
