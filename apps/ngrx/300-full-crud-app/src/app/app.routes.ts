import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./soccer-team-stats.routes')
  }
];
