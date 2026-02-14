import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

import { Card, Game, ShotOnGoal } from '../app.types';

@Injectable({
  providedIn: 'root'
})
export class GameService {
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
  readonly games: Observable<Game[]> = of([]);

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
  getGame(_id: string): Observable<Game | undefined> {
    return of(undefined);
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
  getShotsForGame(_id: string): Observable<ShotOnGoal[]> {
    return of([]);
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
  getCardsForGame(_id: string): Observable<Card[]> {
    return of([]);
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
    _location: string,
    _date: string,
    _name: string
  ): Promise<void> {}

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
    _gameId: string,
    _playerId: string
  ): Promise<void> {}

  /**
   *
   * Makes an AJAX request to add a shot to the indicated game
   *
   * http.post(goalEndpointLocation, shot)
   *
   * Updates corresponding observable pipelines upon success
   *
   */
  async addShotToGame(_shot: Partial<ShotOnGoal>): Promise<void> {}

  /**
   *
   * Makes an AJAX request to add a card to the indicated game
   *
   * http.post(cardEndpointLocation, card)
   *
   * Updates corresponding observable pipelines upon success
   *
   */
  async addCardToGame(_card: Partial<Card>): Promise<void> {}

  /**
   *
   * Makes an AJAX request to remove the indicated game
   *
   * http.delete(`${gameEndpointLocation}/${id}`)
   *
   * Updates corresponding observable pipelines upon success
   *
   */
  async deleteGame(_id: string): Promise<void> {}
}
