import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Card, Game, Player, ShotOnGoal } from '../api-types';

export interface SoccerTeamState {
  games: Game[];
  players: EntityState<Player>;
  shots: ShotOnGoal[];
  cards: Card[];
}

export const playerAdapter = createEntityAdapter<Player>();

export const initialState: SoccerTeamState = {
  games: [],
  players: playerAdapter.getInitialState(),
  shots: [],
  cards: []
};
