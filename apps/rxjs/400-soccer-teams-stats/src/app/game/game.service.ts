import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  firstValueFrom,
  merge,
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  take
} from 'rxjs';

import {
  cardEndpointLocation,
  gameEndpointLocation,
  goalEndpointLocation
} from '../app.constants';
import { Card, Game, ShotOnGoal } from '../app.types';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private http = inject(HttpClient);

  readonly gameId = new BehaviorSubject<string | undefined>(
    undefined
  );
  readonly gameAdded = new Subject<void>();
  readonly gameDeleted = new Subject<string>();
  readonly gameUpdated = new Subject<string>();

  /**
   * A simple list of all games
   *
   * http.get<Game[]>(gameEndpointLocation)
   *
   * This observable has the following characteristics
   * - Fires initially and updates when games are added,
   *    deleted or updated
   * - maps to an inner request for the player list
   * - Shares and replays results with all subscribers
   */
  readonly games: Observable<Game[]> = merge(
    this.gameAdded,
    this.gameDeleted,
    this.gameUpdated
  ).pipe(
    startWith(undefined),
    switchMap(() => this.http.get<Game[]>(gameEndpointLocation)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  /**
   *
   * Returns an observable containing game details excluding stats
   * Often used as the base for more complex representations
   *
   * this.http.get<Game>(`${gameEndpointLocation}/${id}`)
   *
   * Resulting observable has the following characteristics
   * - Fires initially and updates when the indicated game is updated
   *    or deleted
   * - maps to an inner request for the game details
   * - sends an initial seed value upon subscription
   * - Shares and replays results with all subscribers
   *
   */
  getGame(id: string): Observable<Game | undefined> {
    return merge(this.gameUpdated, this.gameDeleted).pipe(
      startWith(id),
      filter(gameChangedId => gameChangedId === id),
      switchMap(() =>
        this.http
          .get<Game>(`${gameEndpointLocation}/${id}`)
          .pipe(startWith(undefined))
      ),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  /**
   * Returns an observable containing the shots on goal for an
   * indicated game
   *
   * http.get<ShotOnGoal[]>(`${goalEndpointLocation}?game=${id}`
   *
   * Resulting observable has the following characteristics
   * - Fires initially and updates when the indicated game is updated
   *    or deleted
   * - maps to an inner request for the shot details
   * - sends an initial seed value upon subscription
   * - Shares and replays results with all subscribers
   */
  getShotsForGame(id: string): Observable<ShotOnGoal[]> {
    return merge(this.gameUpdated, this.gameDeleted).pipe(
      startWith(id),
      filter(gameChangeId => gameChangeId === id),
      switchMap(() =>
        this.http.get<ShotOnGoal[]>(
          `${goalEndpointLocation}?game=${id}`
        )
      ),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  /**
   * Returns an observable containing the cards for an
   * indicated game
   *
   * http.get<Card[]>(`${cardEndpointLocation}?game=${id}`)
   *
   * Resulting observable has the following characteristics
   * - Fires initially and updates when the indicated game is updated
   *    or deleted
   * - maps to an inner request for the card details
   * - sends an initial seed value upon subscription
   * - Shares and replays results with all subscribers
   */
  getCardsForGame(id: string): Observable<Card[]> {
    return merge(this.gameUpdated, this.gameDeleted).pipe(
      startWith(id),
      filter(gameChangeId => gameChangeId === id),
      switchMap(() =>
        this.http.get<Card[]>(`${cardEndpointLocation}?game=${id}`)
      ),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  /**
   * Indicates the user's desire to switch the selected game
   */
  setgame(id: string) {
    this.gameId.next(id);
  }

  /**
   *
   * Makes an AJAX request to add a game to the system
   *
   * http.post<Game>(gameEndpointLocation, {name, date, location, players: []})
   *
   * Updates corresponding observable pipelines upon success
   *
   */
  async addGame(
    location: string,
    date: string,
    name: string
  ): Promise<void> {
    await firstValueFrom(
      this.http.post<Game>(gameEndpointLocation, {
        name,
        date,
        location,
        players: []
      })
    );
    this.gameAdded.next();
  }

  /**
   *
   * Makes an AJAX request to add a player to the indicated game
   *
   * http.put(`${gameEndpointLocation}/${gameId}`, {
   *   ...game,
   *   players: [...game.players, playerId]
   * })
   *
   * Updates corresponding observable pipelines upon success
   *
   */
  async addPlayerToGame(
    gameId: string,
    playerId: string
  ): Promise<void> {
    await firstValueFrom(
      this.getGame(gameId).pipe(
        filter((game): game is Game => !!game),
        take(1),
        switchMap(game =>
          this.http.put(`${gameEndpointLocation}/${gameId}`, {
            ...game,
            players: [...game.players, playerId]
          })
        )
      )
    );
    this.gameUpdated.next('');
  }

  /**
   *
   * Makes an AJAX request to add a shot to the indicated game
   *
   * http.post(goalEndpointLocation, shot)
   *
   * Updates corresponding observable pipelines upon success
   *
   */
  async addShotToGame(shot: Partial<ShotOnGoal>): Promise<void> {
    await firstValueFrom(this.http.post(goalEndpointLocation, shot));
    this.gameUpdated.next('');
  }

  /**
   *
   * Makes an AJAX request to add a card to the indicated game
   *
   * http.post(cardEndpointLocation, card)
   *
   * Updates corresponding observable pipelines upon success
   *
   */
  async addCardToGame(card: Partial<Card>): Promise<void> {
    await firstValueFrom(this.http.post(cardEndpointLocation, card));
    this.gameUpdated.next('');
  }

  /**
   *
   * Makes an AJAX request to remove the indicated game
   *
   * http.delete(`${gameEndpointLocation}/${id}`)
   *
   * Updates corresponding observable pipelines upon success
   *
   */
  async deleteGame(id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete(`${gameEndpointLocation}/${id}`)
    );
    this.gameDeleted.next('');
  }
}
