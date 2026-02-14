import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  firstValueFrom,
  merge,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap
} from 'rxjs';

import { playerEndpointLocation } from '../app.constants';
import { Player } from '../app.types';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private http = inject(HttpClient);

  readonly selectedPlayerId = new BehaviorSubject<string | undefined>(
    undefined
  );
  readonly playerAdded = new Subject<void>();
  readonly playerUpdated = new Subject<string>();
  readonly playerDeleted = new Subject<string>();

  /**
   *
   * A simple list of all players
   *
   * This observable has the following characteristics
   * - Fires initially and updates when players are added,
   *    updated or deleted
   * - maps to an inner request for the player list
   * - Shares and replays results with all subscribers
   *
   */
  readonly players = merge(
    this.playerAdded,
    this.playerUpdated,
    this.playerDeleted
  ).pipe(
    startWith(undefined),
    switchMap(() => this.http.get<Player[]>(playerEndpointLocation)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  /**
   *
   * Returns an observable containing player details excludeing stats
   * Often used as the base for more complex representations
   *
   * Resulting observable has the following characteristics
   * - Fires initially and updates when the indicated player is updated
   *    or deleted
   * - maps to an inner request for the player details
   * - sends an inital seed value upon subscription
   * - Shares and replays results with all subscribers
   *
   */
  getPlayer(id: string): Observable<Player | undefined> {
    return merge(this.playerUpdated, this.playerDeleted).pipe(
      startWith(id),
      filter(playerChangedId => playerChangedId === id),
      switchMap(() =>
        this.http
          .get<Player>(`${playerEndpointLocation}/${id}`)
          .pipe(startWith(undefined))
      ),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  /**
   *
   * Returns a detailed list of the specified players
   *
   * Resulting observable has the following characteristics
   * - Fires and updates based upon the rules of getPlayer
   * - makes request of getPlayer for each id
   * - Shares and replays results with all subscribers
   *
   */
  getPlayers(ids: string[]): Observable<Player[]> {
    return ids.length
      ? combineLatest(ids.map(id => this.getPlayer(id))).pipe(
          filter((players): players is Player[] =>
            players.every(player => !!player)
          ),
          shareReplay({ refCount: true, bufferSize: 1 })
        )
      : of([]);
  }

  /**
   * Indicates the user's desire to switch the selected player
   */
  setSelectedPlayer(id: string) {
    this.selectedPlayerId.next(id);
  }

  /**
   *
   * Makes an AJAX request to add a player to the system
   *
   * Updates corresponding observable pipelines upon success
   *
   */
  async addPlayer(name: string): Promise<void> {
    await firstValueFrom(
      this.http.post<Player>(playerEndpointLocation, { name })
    );
    this.playerAdded.next();
  }

  /**
   *
   * Makes an AJAX request to change player personal data, not
   * game related.
   *
   * Updates corresponding observable pipelines upon success
   *
   */
  async changePlayerName(id: string, newName: string): Promise<void> {
    await firstValueFrom(
      this.http.put<Player>(`${playerEndpointLocation}/${id}`, {
        id,
        name: newName
      })
    );
    this.playerUpdated.next(id);
  }

  /**
   *
   * Makes an AJAX request to delete a player
   *
   * Updates corresponding observable pipelines upon success
   *
   */
  async deletePlayer(id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${playerEndpointLocation}/${id}`)
    );
    this.playerDeleted.next(id);
  }
}
