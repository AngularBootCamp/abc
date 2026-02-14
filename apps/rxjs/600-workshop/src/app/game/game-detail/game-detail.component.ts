import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

import { selectedGameIdRouteParamName } from '../../app.constants';
import { CardListComponent } from '../card-list/card-list.component';
import { GameStatsService } from '../game-stats.service';
import { GameService } from '../game.service';
import { PlayerListComponent } from '../player-list/player-list.component';
import { ShotListComponent } from '../shot-list/shot-list.component';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    PlayerListComponent,
    ShotListComponent,
    CardListComponent,
    AsyncPipe,
    DatePipe
  ]
})
export class GameDetailComponent implements OnDestroy {
  private ar = inject(ActivatedRoute);
  private router = inject(Router);
  private gameService = inject(GameService);
  private gameStatsService = inject(GameStatsService);

  gameIdSub = this.ar.params
    .pipe(map(params => params[selectedGameIdRouteParamName]))
    .subscribe(id => this.gameService.setgame(id));

  gameDetails = this.gameStatsService.currentGameDetails;
  deleting = false;
  playersNotInGame = this.gameStatsService.playersNotInGame;

  delete() {
    this.deleting = true;
    this.gameService
      .deleteGame(
        this.ar.snapshot.params[selectedGameIdRouteParamName]
      )
      .then(() => this.router.navigate(['games']))
      .catch(() => (this.deleting = false));
  }

  ngOnDestroy() {
    this.gameIdSub.unsubscribe();
  }
}
