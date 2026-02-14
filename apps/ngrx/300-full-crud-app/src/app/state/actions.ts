import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Card, Game, Player, ShotOnGoal } from '../api-types';

export const initActions = createActionGroup({
  source: 'Init',
  events: {
    'Load All': emptyProps(),
    'Load Cards': emptyProps(),
    'Load Games': emptyProps(),
    'Load Players': emptyProps(),
    'Load Shots': emptyProps()
  }
});

export const apiActions = createActionGroup({
  source: 'Api',
  events: {
    'Load Cards Success': props<{ cards: Card[] }>(),
    'Load Cards Failure': props<{ error: HttpErrorResponse }>(),
    'Load Games Success': props<{ games: Game[] }>(),
    'Load Games Failure': props<{ error: HttpErrorResponse }>(),
    'Load Players Success': props<{ players: Player[] }>(),
    'Load Players Failure': props<{ error: HttpErrorResponse }>(),
    'Load Shots Success': props<{ shots: ShotOnGoal[] }>(),
    'Load Shots Failure': props<{ error: HttpErrorResponse }>()
  }
});

export const playerPageActions = createActionGroup({
  source: 'Player Page',
  events: {
    'Add Player': props<{ player: Player }>(),
    'Delete Player': props<{ id: string }>(),
    'Update Player Name': props<{ newName: string; id: string }>()
  }
});

export const gamePageActions = createActionGroup({
  source: 'Game Page',
  events: {
    'Add Card': props<{ card: Card }>(),
    'Add Game': props<{ game: Game }>(),
    'Add Shot': props<{ shot: ShotOnGoal }>(),
    'Delete Card': props<{ id: string }>(),
    'Delete Game': props<{ id: string }>(),
    'Update Game': props<{ game: Game }>()
  }
});
