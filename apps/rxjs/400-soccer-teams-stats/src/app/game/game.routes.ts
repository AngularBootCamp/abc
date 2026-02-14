import { Routes } from '@angular/router';

import { selectedGameIdRouteParamName } from '../app.constants';

import { GameDetailComponent } from './game-detail/game-detail.component';
import { GamesComponent } from './games/games.component';

const gameRoutes: Routes = [
  {
    path: '',
    component: GamesComponent,
    children: [
      {
        path: `:${selectedGameIdRouteParamName}`,
        component: GameDetailComponent
      }
    ]
  }
];

export default gameRoutes;
