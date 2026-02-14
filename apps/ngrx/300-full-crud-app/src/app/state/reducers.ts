import { createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { Player } from '../api-types';

import {
  apiActions,
  gamePageActions,
  playerPageActions
} from './actions';
import { initialState } from './state';

const playerAdapter = createEntityAdapter<Player>();

export const playersFeature = createFeature({
  name: 'players',
  reducer: createReducer(
    initialState.players,
    on(apiActions.loadPlayersSuccess, (prevState, a) =>
      playerAdapter.setAll(a.players, prevState)
    ),
    on(playerPageActions.addPlayer, (prevState, a) =>
      playerAdapter.addOne(a.player, prevState)
    ),
    on(playerPageActions.deletePlayer, (prevState, a) =>
      playerAdapter.removeOne(a.id, prevState)
    ),
    on(playerPageActions.updatePlayerName, (prevState, a) =>
      playerAdapter.updateOne(
        {
          id: a.id,
          changes: {
            name: a.newName
          }
        },
        prevState
      )
    )
  )
});

export const gamesFeature = createFeature({
  name: 'games',
  reducer: createReducer(
    initialState.games,
    on(apiActions.loadGamesSuccess, (_prevState, a) =>
      a.games.map(game => ({ ...game, id: '' + game.id }))
    ),
    on(gamePageActions.addGame, (prevState, a) => [
      ...prevState,
      { ...a.game, id: '' + a.game.id }
    ]),
    on(gamePageActions.deleteGame, (prevState, a) =>
      prevState.filter(g => g.id !== a.id)
    ),
    on(gamePageActions.updateGame, (prevState, a) => {
      const index = prevState.findIndex(g => g.id === a.game.id);
      const front = prevState.slice(0, index);
      const back = prevState.slice(index + 1, prevState.length);
      return [...front, a.game, ...back];
    })
  )
});

export const cardsFeature = createFeature({
  name: 'cards',
  reducer: createReducer(
    initialState.cards,
    on(apiActions.loadCardsSuccess, (_prevState, a) => a.cards),
    on(gamePageActions.addCard, (prevState, a) => [
      ...prevState,
      a.card
    ]),
    on(gamePageActions.deleteCard, (prevState, a) =>
      prevState.filter(c => c.id !== a.id)
    )
  )
});

export const shotsFeature = createFeature({
  name: 'shots',
  reducer: createReducer(
    initialState.shots,
    on(apiActions.loadShotsSuccess, (_prevState, a) => a.shots),
    on(gamePageActions.addShot, (prevState, a) => [
      ...prevState,
      a.shot
    ]),
    on(gamePageActions.deleteCard, (prevState, a) =>
      prevState.filter(s => s.id !== a.id)
    )
  )
});
