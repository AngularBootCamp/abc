import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  OnInitEffects
} from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

import { Card, Game, Player, ShotOnGoal } from '../api-types';
import {
  cardEndpointLocation,
  gameEndpointLocation,
  goalEndpointLocation,
  playerEndpointLocation
} from '../api-urls';

import { apiActions, initActions } from './actions';

@Injectable()
export class SoccerTeamEffects implements OnInitEffects {
  private http = inject(HttpClient);
  private actions = inject(Actions);

  translateGetAll = createEffect(() =>
    this.actions.pipe(
      ofType(initActions.loadAll),
      mergeMap(() => [
        initActions.loadCards(),
        initActions.loadPlayers(),
        initActions.loadGames(),
        initActions.loadShots()
      ])
    )
  );

  getCards = createEffect(() =>
    this.actions.pipe(
      ofType(initActions.loadCards),
      switchMap(() =>
        this.http.get<Card[]>(cardEndpointLocation).pipe(
          map(cards => apiActions.loadCardsSuccess({ cards })),
          catchError(e => of(apiActions.loadCardsFailure(e)))
        )
      )
    )
  );

  getPlayers = createEffect(() =>
    this.actions.pipe(
      ofType(initActions.loadPlayers),
      switchMap(() =>
        this.http.get<Player[]>(playerEndpointLocation).pipe(
          map(players => apiActions.loadPlayersSuccess({ players })),
          catchError(e => of(apiActions.loadPlayersFailure(e)))
        )
      )
    )
  );

  getGames = createEffect(() =>
    this.actions.pipe(
      ofType(initActions.loadGames),
      switchMap(() =>
        this.http.get<Game[]>(gameEndpointLocation).pipe(
          map(games => apiActions.loadGamesSuccess({ games })),
          catchError(e => of(apiActions.loadGamesFailure(e)))
        )
      )
    )
  );

  getShots = createEffect(() =>
    this.actions.pipe(
      ofType(initActions.loadGames),
      switchMap(() =>
        this.http.get<ShotOnGoal[]>(goalEndpointLocation).pipe(
          map(shots => apiActions.loadShotsSuccess({ shots })),
          catchError(e => of(apiActions.loadShotsFailure(e)))
        )
      )
    )
  );

  ngrxOnInitEffects() {
    return initActions.loadAll();
  }
}
