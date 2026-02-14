import { Route } from '@angular/router';

import { LoggerService } from './logger.service';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'constellation-viewer-using-constructor',
    pathMatch: 'full'
  },

  {
    path: 'constellation-viewer-using-constructor',
    providers: [LoggerService],
    loadComponent: () =>
      import('./constellation-viewer-using-constructor/constellation-viewer.component')
  },

  {
    path: 'constellation-viewer-using-constructor/:id',
    providers: [LoggerService],
    loadComponent: () =>
      import('./constellation-viewer-using-constructor/constellation-viewer.component')
  },

  {
    path: 'constellation-viewer-using-inject',
    loadComponent: () =>
      import('./constellation-viewer-using-inject/constellation-viewer.component')
  },

  {
    path: 'constellation-viewer-using-inject/:id',
    loadComponent: () =>
      import('./constellation-viewer-using-inject/constellation-viewer.component')
  },

  {
    path: 'credits',
    loadComponent: () => import('./credits.component')
  },

  { path: '**', redirectTo: 'constellation-viewer-using-constructor' }
];
