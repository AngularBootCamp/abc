import { AsyncPipe, PercentPipe } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { map, merge, Subject } from 'rxjs';

import { selectedPlayerIdRouteParamName } from '../../app.constants';
import { PlayerNameEditorComponent } from '../player-name-editor/player-name-editor.component';
import { PlayerStatsService } from '../player-stats.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.scss',
  imports: [
    PlayerNameEditorComponent,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    AsyncPipe,
    PercentPipe
  ]
})
export class PlayerDetailComponent implements OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private playerService = inject(PlayerService);
  private playerStatsService = inject(PlayerStatsService);
  private router = inject(Router);

  playerIdSub = this.activatedRoute.params
    .pipe(map(params => params[selectedPlayerIdRouteParamName]))
    .subscribe(id => this.playerService.setSelectedPlayer(id));

  deleting = new Subject<string>();

  displayedColumns = [
    'gameName',
    'location',
    'date',
    'goals',
    'shots',
    'shotAverage',
    'assists',
    'yellowCard',
    'redCard'
  ];

  player = this.playerStatsService.selectedPlayerWithStats;

  playerGameTableData =
    this.playerStatsService.gameBreakdownForSelectedPlayer;

  canDelete = merge(
    this.activatedRoute.params.pipe(
      map(params => params[selectedPlayerIdRouteParamName]),
      map(() => 'Loading player data')
    ),
    this.playerGameTableData.pipe(
      map(td =>
        td.length > 0
          ? 'Cannot delete a player that has games'
          : undefined
      )
    ),
    this.deleting
  );

  ngOnDestroy() {
    this.playerIdSub.unsubscribe();
  }

  updateName(newName: string) {
    return this.playerService.changePlayerName(
      this.activatedRoute.snapshot.params[
        selectedPlayerIdRouteParamName
      ],
      newName
    );
  }

  delete() {
    this.deleting.next('Deletion in progress');
    this.playerService
      .deletePlayer(
        this.activatedRoute.snapshot.params[
          selectedPlayerIdRouteParamName
        ]
      )
      .then(() => this.router.navigate(['players']))
      .catch(() => this.deleting.next(''));
  }
}
