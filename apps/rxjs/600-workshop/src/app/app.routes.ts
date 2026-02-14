import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'players',
    loadChildren: () => import('./player/player.routes')
  },
  {
    path: 'games',
    loadChildren: () => import('./game/game.routes')
  }
];
