import { Injectable, inject } from '@angular/core';
import {
  combineLatest,
  filter,
  map,
  Observable,
  shareReplay,
  switchMap
} from 'rxjs';

import {
  Card,
  Game,
  GameWithEvents,
  Player,
  ShotOnGoal
} from '../app.types';
import { PlayerService } from '../player/player.service';

import { GameService } from './game.service';

@Injectable({ providedIn: 'root' })
export class GameStatsService {
  private gameService = inject(GameService);
  private playerService = inject(PlayerService);

  /**
   * A detailed representation of the currently selected game
   *
   * This observable has the following characteristics:
   * - Updates based upon the rules of gameId
   * - maps to an inner observable to perform detail request
   * - Shares and replays results with all subscribers
   */
  currentGameDetails: Observable<GameWithEvents> =
    this.gameService.gameId.pipe(
      filter((id): id is string => !!id),
      switchMap(id => this.getGameWithDetails(id)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

  /**
   * An observable containing the list of players that are
   * not currently part of the selected game. Useful
   * when working on the add player interface
   *
   * The observable has the following characteristics:
   * - Fires any time the current game or player list updates
   * - Combines the current game details and player list to
   *    form the list of missing players
   * - Shares and replays results with all subscribers
   *
   */
  playersNotInGame: Observable<Player[]> = combineLatest([
    this.currentGameDetails,
    this.playerService.players
  ]).pipe(
    map(([game, players]) =>
      players.filter(
        p => !game.playerDetails.find(x => x.id === p.id)
      )
    ),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  /**
   * Rounds up the multiple observables needed to form a game
   * with events. It uses the simple list of games and an
   * indicated game id. Typically called by getGamesWithDetails
   *
   * The resulting observable has the following characteristics
   * - Updates with changes to the player list, shots for the game
   *    and cards for the game.
   * - Combines the player list, shots for the game and cards for the game
   *    to map to the detailed game object
   * - Shares and replays results with all subscribers
   */
  gatherGameDetails(
    games: Game[],
    id: string
  ): Observable<GameWithEvents> {
    const game = games.find(g => g.id === id);
    return combineLatest([
      this.playerService.getPlayers(game ? game.players : []),
      this.gameService.getShotsForGame(id),
      this.gameService.getCardsForGame(id)
    ]).pipe(
      map(([playerDetails, shots, cards]) =>
        buildGameWithEvents(game, playerDetails, shots, cards)
      ),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  /**
   * Rounds up the details of an indicated game
   *
   * The resulting observable has the following characteristics
   * - Updates with changes to the game list
   * - maps to an inner observable obtained from gatherGameDetails
   * - Shares and replays results with all subscribers
   */
  getGameWithDetails(id: string): Observable<GameWithEvents> {
    return this.gameService.games.pipe(
      switchMap(games => this.gatherGameDetails(games, id)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }
}

function buildGameWithEvents(
  game: Game | undefined,
  playerDetails: Player[],
  shots: ShotOnGoal[],
  cards: Card[]
): GameWithEvents {
  const shotsWithNames = shots.map(s => ({
    ...s,
    playerName: playerDetails.find(p => p.id === s.player)?.name,
    assistName: s.assist
      ? playerDetails.find(p => p.id === s.assist)?.name
      : 'None'
  }));
  const cardsWithNames = cards.map(c => ({
    ...c,
    playerName: playerDetails.find(p => p.id === c.player)?.name
  }));
  return {
    ...game,
    playerDetails,
    shots: shotsWithNames,
    cards: cardsWithNames
  } as GameWithEvents;
}
