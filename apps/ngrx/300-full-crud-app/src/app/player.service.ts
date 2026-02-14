import { Observable } from 'rxjs';

import {
  Card,
  Game,
  Player,
  PlayerWithStats,
  ShotOnGoalWithNames
} from './api-types';

export abstract class PlayerService {
  abstract players: Observable<Player[]>;

  abstract player(playerId: string): Observable<Player>;

  abstract addPlayer(name: string): Promise<void>;

  abstract changePlayerName(
    playerId: string,
    newName: string
  ): Promise<void>;

  abstract playerGames(playerId: string): Observable<Game[]>;

  abstract playerShots(
    playerId: string
  ): Observable<ShotOnGoalWithNames[]>;

  abstract playerCards(playerId: string): Observable<Card[]>;

  abstract playerAssists(
    playerId: string
  ): Observable<ShotOnGoalWithNames[]>;

  abstract playerWithStats(
    playerId: string
  ): Observable<PlayerWithStats>;

  abstract deletePlayer(playerId: string): Promise<void>;
}
