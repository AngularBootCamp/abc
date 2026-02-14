import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'offline', pathMatch: 'full' },
  {
    path: 'offline',
    loadChildren: () => import('./offline/offline.routes')
  },
  {
    path: 'singleplayer',
    loadChildren: () => import('./single-player/single-player.routes')
  },
  {
    path: 'multiplayer',
    loadChildren: () => import('./multi-player/multi-player.routes')
  }
];
