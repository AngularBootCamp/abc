import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  firstValueFrom,
  forkJoin,
  map,
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap
} from 'rxjs';

import {
  Card,
  Game,
  Player,
  PlayerWithStats,
  ShotOnGoal,
  ShotOnGoalWithNames
} from './api-types';
import {
  cardEndpointLocation,
  gameEndpointLocation,
  goalEndpointLocation,
  playerEndpointLocation
} from './api-urls';
import { PlayerService } from './player.service';

// TODO: implement error handling

@Injectable()
export class PureObservablePlayerService extends PlayerService {
  private http = inject(HttpClient);

  private loadList = new Subject<void>();
  readonly players = this.loadList.pipe(
    startWith(undefined),
    switchMap(() => this.http.get<Player[]>(playerEndpointLocation)),
    shareReplay(1)
  );

  player(id: string) {
    return this.http.get<Player>(`${playerEndpointLocation}/${id}`);
  }

  async addPlayer(name: string) {
    await firstValueFrom(
      this.http.post<Player>(playerEndpointLocation, { name })
    );
    this.loadList.next();
  }

  async changePlayerName(id: string, newName: string) {
    await firstValueFrom(
      this.http.put<Player>(`${playerEndpointLocation}/${id}`, {
        id,
        name: newName
      })
    );
    this.loadList.next();
  }

  playerGames(id: string) {
    return this.http
      .get<Game[]>(gameEndpointLocation)
      .pipe(map(games => games.filter(g => g.players.includes(id))));
  }

  playerShots(id: string): Observable<ShotOnGoalWithNames[]> {
    return this.http
      .get<ShotOnGoal[]>(`${goalEndpointLocation}?player=${id}`)
      .pipe(
        switchMap(shots =>
          forkJoin(
            shots.map(s =>
              forkJoin([
                this.player(s.player),
                this.player(s.assist)
              ]).pipe(
                map(([player, assist]) => ({
                  ...s,
                  playerName: player.name,
                  assistName: assist.name
                }))
              )
            )
          )
        ),
        startWith([])
      );
  }

  playerCards(id: string) {
    return this.http.get<Card[]>(
      `${cardEndpointLocation}?player=${id}`
    );
  }

  playerAssists(id: string): Observable<ShotOnGoalWithNames[]> {
    return this.http
      .get<ShotOnGoal[]>(`${goalEndpointLocation}?assist=${id}`)
      .pipe(
        switchMap(shots =>
          forkJoin(
            shots.map(s =>
              forkJoin([
                this.player(s.player),
                this.player(s.assist)
              ]).pipe(
                map(([player, assist]) => ({
                  ...s,
                  playerName: player.name,
                  assistName: assist.name
                }))
              )
            )
          )
        ),
        startWith([])
      );
  }

  playerWithStats(id: string): Observable<PlayerWithStats> {
    return forkJoin([
      this.player(id),
      this.playerGames(id),
      this.playerShots(id),
      this.playerCards(id),
      this.playerAssists(id)
    ]).pipe(
      map(([player, games, shotsOnGoal, cards, assists]) => ({
        ...player,
        games,
        shotsOnGoal,
        cards,
        assists
      }))
    );
  }

  async deletePlayer(id: string) {
    await firstValueFrom(
      this.http.delete<void>(`${playerEndpointLocation}/${id}`)
    );
    this.loadList.next();
  }
}
