/* eslint-disable @angular-eslint/use-injectable-provided-in
-- Effect injectables are handled by NgRx
*/
import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

import {
  Actions,
  OnInitEffects,
  createEffect,
  ofType,
} from '@ngrx/effects';

import { Card, Game, Player, ShotOnGoal } from '../api-types';
import {
  cardEndpointLocation,
  gameEndpointLocation,
  goalEndpointLocation,
  playerEndpointLocation,
} from '../api-urls';

import { apiActions, initActions } from './actions';

@Injectable()
export class SoccerTeamEffects implements OnInitEffects {
  private readonly http = inject(HttpClient);
  private actions = inject(Actions);

  /* eslint-disable @ngrx/no-multiple-actions-in-effects */

  translateGetAll = createEffect(() =>
    this.actions.pipe(
      ofType(initActions.loadAll),
      mergeMap(() => [
        initActions.loadCards(),
        initActions.loadPlayers(),
        initActions.loadGames(),
        initActions.loadShots(),
      ]),
    ),
  );

  /* eslint-enable @ngrx/no-multiple-actions-in-effects */

  getCards = createEffect(() =>
    this.actions.pipe(
      ofType(initActions.loadCards),
      switchMap(() =>
        this.http.get<Card[]>(cardEndpointLocation).pipe(
          map(cards => apiActions.loadCardsSuccess({ cards })),
          catchError(e => of(apiActions.loadCardsFailure(e))),
        ),
      ),
    ),
  );

  getPlayers = createEffect(() =>
    this.actions.pipe(
      ofType(initActions.loadPlayers),
      switchMap(() =>
        this.http.get<Player[]>(playerEndpointLocation).pipe(
          map(players => apiActions.loadPlayersSuccess({ players })),
          catchError(e => of(apiActions.loadPlayersFailure(e))),
        ),
      ),
    ),
  );

  getGames = createEffect(() =>
    this.actions.pipe(
      ofType(initActions.loadGames),
      switchMap(() =>
        this.http.get<Game[]>(gameEndpointLocation).pipe(
          map(games => apiActions.loadGamesSuccess({ games })),
          catchError(e => of(apiActions.loadGamesFailure(e))),
        ),
      ),
    ),
  );

  getShots = createEffect(() =>
    this.actions.pipe(
      ofType(initActions.loadGames),
      switchMap(() =>
        this.http.get<ShotOnGoal[]>(goalEndpointLocation).pipe(
          map(shots => apiActions.loadShotsSuccess({ shots })),
          catchError(e => of(apiActions.loadShotsFailure(e))),
        ),
      ),
    ),
  );

  ngrxOnInitEffects() {
    return initActions.loadAll();
  }
}
