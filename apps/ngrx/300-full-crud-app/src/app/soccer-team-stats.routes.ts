import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import {
  selectedGameIdRouteParamName,
  selectedPlayerIdRouteParamName
} from './feature.constants';
import { GameComponent } from './game-screen/game/game.component';
import { GamesComponent } from './game-screen/games/games.component';
import { NgrxPlayerService } from './ngrx-player.service';
import { PlayerComponent } from './player-screen/player/player.component';
import { PlayersComponent } from './player-screen/players/players.component';
import { PlayerService } from './player.service';
import { SoccerTeamStatsComponent } from './soccer-team-stats.component';
import {
  cardsFeature,
  gamesFeature,
  playersFeature,
  shotsFeature
} from './state/reducers';
import { SoccerTeamEffects } from './state/soccer-team.effects';

const soccerTeamStatsRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState(cardsFeature),
      provideState(gamesFeature),
      provideState(playersFeature),
      provideState(shotsFeature),
      provideEffects(SoccerTeamEffects),
      {
        provide: PlayerService,
        useClass: NgrxPlayerService
      }
    ],
    component: SoccerTeamStatsComponent,
    children: [
      {
        path: 'players',
        component: PlayersComponent,
        children: [
          {
            path: `:${selectedPlayerIdRouteParamName}`,
            component: PlayerComponent
          }
        ]
      },
      {
        path: 'games',
        component: GamesComponent,
        children: [
          {
            path: `:${selectedGameIdRouteParamName}`,
            component: GameComponent
          }
        ]
      },
      { path: '', redirectTo: 'players', pathMatch: 'prefix' }
    ]
  }
];

export default soccerTeamStatsRoutes;
