import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  combineLatest,
  filter,
  map,
  merge,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap
} from 'rxjs';

import {
  cardEndpointLocation,
  cardTypes,
  gameEndpointLocation,
  goalEndpointLocation
} from '../app.constants';
import {
  Card,
  Game,
  Player,
  PlayerStatsByGame,
  PlayerWithStats,
  ShotOnGoal,
  ShotOnGoalWithNames
} from '../app.types';
import { GameService } from '../game/game.service';

import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {
  private http = inject(HttpClient);
  private playerService = inject(PlayerService);
  private gameService = inject(GameService);

  /**
   * The representation of the currently selected player with stats
   * More than just the simple representation; this property includes
   * the overall stats associated with the player.
   *
   * This observable has the following characteristics:
   * - Only fires/updates when the selected player id changes
   * - Maps to an inner observable obtained from getPlayerWithStats
   * - Shares and replays results with all subscribers
   *
   */
  selectedPlayerWithStats = this.playerService.selectedPlayerId.pipe(
    filter((id): id is string => !!id),
    switchMap(id => this.getPlayerWithStats(id)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  /**
   * The representation of the currently selected player that includes
   * a per game breakdown of statistics. This is useful on game-centric
   * views.
   *
   * This observable has the following characteristics:
   * - Only fires/updates when the selectedPlayerWithStats changes
   * - Shares and replays results with all subscribers
   *
   */
  gameBreakdownForSelectedPlayer = this.selectedPlayerWithStats.pipe(
    map(player => createGameBreakdown(player)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  /**
   * Obtain a list of games played by the indicated player
   *
   * The returned observable has the following characteristics
   * - Fires initially and updates when the indicated player is deleted,
   *    the currently selected game is updated
   *    the currently selected game is deleted
   * - Maps to an inner observable of all games
   * - filters the games to those played by the player
   * - While waiting for results, sends an initial seed value
   * - Shares and replays results with all subscribers
   *
   */
  getPlayerGames(id: string): Observable<Game[]> {
    return merge(
      this.playerService.playerDeleted.pipe(
        startWith(id),
        filter(playerDeletedId => playerDeletedId === id)
      ),
      this.gameService.gameUpdated,
      this.gameService.gameDeleted
    ).pipe(
      switchMap(() =>
        this.http
          .get<Game[]>(gameEndpointLocation)
          .pipe(startWith([] as Game[]))
      ),
      map(games => games.filter(g => g.players.includes(id))),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  /**
   *
   * Obtains a list of shots on the goal for the indicated player
   * for all games. This list also includes details about shotter
   * and assist. As such, the payload should be refreshed if the
   * players are updated
   *
   * The returned observable has the following characteristics
   * - Fires initially and updates when the indicated player is
   *     updated or deleted and  the selected game is updated
   *     or deleted
   * - Maps to an inner observable to obtain the list of shots on goal
   * - maps again to an inner observable that combines the player details
   *     and shot details
   * - While waiting for results, sends an initial seed value
   * - Shares and replays results with all subscribers
   *
   */
  getPlayerShots(id: string): Observable<ShotOnGoalWithNames[]> {
    return merge(
      this.gameService.gameDeleted,
      this.gameService.gameUpdated,
      merge(
        this.playerService.playerUpdated,
        this.playerService.playerDeleted
      ).pipe(
        startWith(id),
        filter(playerUpdatedId => playerUpdatedId === id)
      )
    ).pipe(
      switchMap(() =>
        this.http
          .get<ShotOnGoal[]>(`${goalEndpointLocation}?player=${id}`)
          .pipe(startWith([] as ShotOnGoal[]))
      ),
      switchMap(shots =>
        shots.length
          ? combineLatest(
              shots.map(s =>
                this.playerService
                  .getPlayers([s.player, s.assist])
                  .pipe(
                    map(([player, assist]) =>
                      formShot(s, player, assist)
                    )
                  )
              )
            )
          : of([])
      ),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  /**
   * Provides an observable that contains the cards given
   * to the indicated player.
   *
   * The returned observable has the following characteristics
   * - Fires initially and updates when the indicated player is
   *     deleted and  the selected game is updated or deleted
   * - Maps to an inner observable to obtain the list of cards for
   *    the indicated player
   * - While waiting for results, sends an initial seed value
   * - Shares and replays results with all subscribers
   */
  getPlayerCards(id: string): Observable<Card[]> {
    return merge(
      this.gameService.gameDeleted,
      this.gameService.gameUpdated,
      this.playerService.playerDeleted.pipe(
        startWith(id),
        filter(playerUpdatedId => playerUpdatedId === id)
      )
    ).pipe(
      switchMap(() =>
        this.http
          .get<Card[]>(`${cardEndpointLocation}?player=${id}`)
          .pipe(startWith([] as Card[]))
      ),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  /**
   *
   * Obtain a list of assists associated with the indicated player
   *
   * The returned observable has the following characteristics
   * - Fires initially and updates when the indicated player is
   *     updated or deleted and  the selected game is updated
   *     or deleted
   * - Maps to an inner observable to obtain the list of shots on goal
   * - maps again to an inner observable that combines the player details
   *     and shot details
   * - While waiting for results, sends an initial seed value
   * - Shares and replays results with all subscribers
   *
   */
  getPlayerAssists(id: string): Observable<ShotOnGoalWithNames[]> {
    return merge(
      this.gameService.gameDeleted,
      this.gameService.gameUpdated,
      merge(
        this.playerService.playerUpdated,
        this.playerService.playerDeleted
      ).pipe(
        startWith(id),
        filter(playerUpdatedId => playerUpdatedId === id)
      )
    ).pipe(
      switchMap(() =>
        this.http
          .get<ShotOnGoal[]>(`${goalEndpointLocation}?assist=${id}`)
          .pipe(startWith([] as ShotOnGoal[]))
      ),
      switchMap(shots =>
        shots.length
          ? combineLatest(
              shots.map(s =>
                this.playerService
                  .getPlayers([s.player, s.assist])
                  .pipe(
                    map(([player, assist]) =>
                      formShot(s, player, assist)
                    )
                  )
              )
            )
          : of([])
      ),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  /**
   *
   * Determines when and how to fetch player details
   *
   * The returned observable has the following characteristics
   * - Fires initially and updates when the indicated player
   *    info changes including games played, shots, cards and assists
   * - Combines the list of potential changes mentioned above
   *    to form a single representation of the player
   * - Shares and replays results with all subscribers
   *
   */
  getPlayerWithStats(id: string): Observable<PlayerWithStats> {
    return combineLatest([
      this.playerService
        .getPlayer(id)
        .pipe(filter((player): player is Player => !!player)),
      this.getPlayerGames(id),
      this.getPlayerShots(id),
      this.getPlayerCards(id),
      this.getPlayerAssists(id)
    ]).pipe(
      map(([player, games, shotsOnGoal, cards, assists]) => ({
        ...player,
        games,
        shotsOnGoal,
        cards,
        assists
      })),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }
}

/**
 * Brings together various pieces of a shot to form
 * a more detailed representation.
 *
 * @param shot basic shot details to be added to the detailed format
 * @param player player who made the shot
 * @param assist player who assisted on the shot
 */
function formShot(shot: ShotOnGoal, player: Player, assist: Player) {
  return {
    ...shot,
    playerName: player.name,
    assistName: assist.name
  };
}

function createGameBreakdown(
  player: PlayerWithStats
): PlayerStatsByGame[] {
  return player.games.map(game => ({
    name: game.name,
    location: game.location,
    date: game.date,
    shots: player.shotsOnGoal.filter(shot => shot.game === game.id)
      .length,
    goals: player.shotsOnGoal
      .filter(shot => shot.game === game.id)
      .filter(sog => sog.scored).length,
    assists: player.assists.filter(shot => shot.game === game.id)
      .length,
    redCard:
      player.cards.filter(
        card =>
          card.game === game.id && card.type === cardTypes['red']
      ).length > 0,
    yellowCard:
      player.cards.filter(
        card =>
          card.game === game.id && card.type === cardTypes['yellow']
      ).length > 0
  }));
}
