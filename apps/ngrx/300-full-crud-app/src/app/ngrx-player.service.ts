import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, firstValueFrom, Observable } from 'rxjs';

import { Player, PlayerWithStats } from './api-types';
import { playerEndpointLocation } from './api-urls';
import { PlayerService } from './player.service';
import { playerPageActions } from './state/actions';
import {
  selectAllPlayers,
  selectAssistsForPlayer,
  selectCardsForPlayer,
  selectGamesForPlayer,
  selectPlayer,
  selectPlayerWithDetails,
  selectShotsForPlayer
} from './state/selectors';

const check = (p: Player | undefined): p is Player => !!p;

@Injectable()
export class NgrxPlayerService extends PlayerService {
  private store = inject(Store);
  private http = inject(HttpClient);

  players = this.store.select(selectAllPlayers);
  player(playerId: string): Observable<Player> {
    return this.store
      .select(selectPlayer(playerId))
      .pipe(filter(check));
  }

  async addPlayer(name: string): Promise<void> {
    await firstValueFrom(
      this.http.post<Player>(playerEndpointLocation, { name })
    ).then(player =>
      this.store.dispatch(playerPageActions.addPlayer({ player }))
    );
  }
  async changePlayerName(id: string, name: string): Promise<void> {
    await firstValueFrom(
      this.http.put(`${playerEndpointLocation}/${id}`, { id, name })
    ).then(() =>
      this.store.dispatch(
        playerPageActions.updatePlayerName({ id, newName: name })
      )
    );
  }
  playerGames(playerId: string) {
    return this.store.select(selectGamesForPlayer(playerId));
  }
  playerShots(playerId: string) {
    return this.store.select(selectShotsForPlayer(playerId));
  }
  playerCards(playerId: string) {
    return this.store.select(selectCardsForPlayer(playerId));
  }
  playerAssists(playerId: string) {
    return this.store.select(selectAssistsForPlayer(playerId));
  }
  playerWithStats(id: string): Observable<PlayerWithStats> {
    return this.store.select(selectPlayerWithDetails(id));
  }
  async deletePlayer(id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${playerEndpointLocation}/${id}`)
    ).then(() =>
      this.store.dispatch(playerPageActions.deletePlayer({ id }))
    );
  }
}
