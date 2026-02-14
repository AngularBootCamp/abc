import { Routes } from '@angular/router';

import { selectedPlayerIdRouteParamName } from '../app.constants';

import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayersComponent } from './players/players.component';

const playerRoutes: Routes = [
  {
    path: '',
    component: PlayersComponent,
    children: [
      {
        path: `:${selectedPlayerIdRouteParamName}`,
        component: PlayerDetailComponent
      }
    ]
  }
];

export default playerRoutes;
