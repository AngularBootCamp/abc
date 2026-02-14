import { createSelector } from '@ngrx/store';

import { GameWithEvents, Player } from '../api-types';

import {
  cardsFeature,
  gamesFeature,
  playersFeature,
  shotsFeature
} from './reducers';
import { playerAdapter } from './state';

// get the selectors
export const { selectAll, selectEntities } =
  playerAdapter.getSelectors();

export const { selectGamesState } = gamesFeature;
export const { selectCardsState } = cardsFeature;
export const { selectPlayersState } = playersFeature;
export const { selectShotsState } = shotsFeature;

export const selectAllPlayers = createSelector(
  selectPlayersState,
  selectAll
);

const selectPlayersEntities = createSelector(
  selectPlayersState,
  selectEntities
);

export const selectPlayer = (id: string) =>
  createSelector(selectPlayersState, s => s.entities[id]);

export const selectGamesForPlayer = (id: string) =>
  createSelector(selectGamesState, games =>
    games.filter(g => g.players.includes(id))
  );

export const selectShotsForPlayer = (id: string) =>
  createSelector(
    selectShotsState,
    selectPlayersEntities,
    (shots, players) =>
      shots
        .filter(shot => shot.player === id)
        .map(shot => {
          const player = players[shot.player];
          const assist = players[shot.assist];
          const playerName = player ? player.name : '';
          const assistName = assist ? assist.name : '';
          return {
            ...shot,
            playerName,
            assistName
          };
        })
  );

export const selectAssistsForPlayer = (playerId: string) =>
  createSelector(
    selectShotsState,
    selectPlayersEntities,
    (shots, players) =>
      shots
        .filter(shot => shot.assist === playerId)
        .map(shot => {
          const player = players[shot.player];
          const assist = players[shot.assist];
          const playerName = player ? player.name : '';
          const assistName = assist ? assist.name : '';
          return {
            ...shot,
            playerName,
            assistName
          };
        })
  );

export const selectCardsForPlayer = (playerId: string) =>
  createSelector(selectCardsState, cards =>
    cards.filter(c => c.player === playerId)
  );

export const selectPlayerWithDetails = (playerId: string) =>
  createSelector(
    selectPlayer(playerId),
    selectGamesForPlayer(playerId),
    selectShotsForPlayer(playerId),
    selectCardsForPlayer(playerId),
    selectAssistsForPlayer(playerId),
    (player, games, shotsOnGoal, cards, assists) => {
      if (!player) {
        player = {
          name: '',
          id: ''
        };
      }
      return {
        ...player,
        games,
        shotsOnGoal,
        cards,
        assists
      };
    }
  );

export const selectGame = (id: string) =>
  createSelector(selectGamesState, games =>
    games.find(g => g.id === id)
  );

export const selectShotsForGame = (id: string) =>
  createSelector(selectShotsState, shots =>
    shots.filter(s => s.game === id)
  );

export const selectGameWithPlayerNames = (id: string) =>
  createSelector(
    selectGamesState,
    selectPlayersEntities,
    (games, players) => {
      const game = games.find(g => g.id === id);
      const check = (p: Player | undefined): p is Player => !!p;
      if (game) {
        return {
          ...game,
          playerDetails: game.players
            .map(player => players[player])
            .filter(check)
        };
      } else {
        return {
          playerDetails: []
        };
      }
    }
  );

export const selectCardsForGame = (id: string) =>
  createSelector(selectCardsState, cards =>
    cards.filter(c => c.game === id)
  );

export const selectGameWithDetails = (id: string) =>
  createSelector(
    selectGameWithPlayerNames(id),
    selectShotsForGame(id),
    selectCardsForGame(id),
    (game, shots, cards) => {
      if (!game) {
        game = {
          playerDetails: []
        };
      }
      const shotsWithNames = shots.map(s => ({
        ...s,
        playerName: game.playerDetails.find(p => p.id === s.player)
          ?.name,
        assistName: s.assist
          ? game.playerDetails.find(p => p.id === s.assist)?.name
          : 'None'
      }));
      const cardsWithNames = cards.map(c => ({
        ...c,
        playerName: game.playerDetails.find(p => p.id === c.player)
          ?.name
      }));
      return {
        ...game,
        shots: shotsWithNames,
        cards: cardsWithNames
      } as GameWithEvents;
    }
  );
