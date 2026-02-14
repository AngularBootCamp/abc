import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'store-comparator', pathMatch: 'full' },
  {
    path: 'store-comparator',
    loadComponent: () =>
      import('./store-comparator/store-comparator.component')
  },
  {
    path: 'individual-comparator',
    loadComponent: () =>
      import('./individual-comparator/individual-comparator.component')
  }
];
