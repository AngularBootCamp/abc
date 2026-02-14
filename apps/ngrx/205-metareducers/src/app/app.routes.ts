import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.routes')
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./user-profile/user-profile.component')
  }
];
