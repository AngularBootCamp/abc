import { AsyncPipe, PercentPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import {
  map,
  merge,
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap
} from 'rxjs';

import {
  cardTypes,
  selectedPlayerIdRouteParamName
} from '../../feature.constants';
import { PlayerService } from '../../player.service';
import { PlayerNameEditorComponent } from '../player-name-editor/player-name-editor.component';

interface PlayerDataByGame {
  location: string;
  date: string;
  shots: number;
  goals: number;
  assists: number;
  redCard: boolean;
  yellowCard: boolean;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  imports: [
    MatCardModule,
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
export class PlayerComponent {
  private ar = inject(ActivatedRoute);
  private ps = inject(PlayerService);
  private router = inject(Router);

  player = this.ar.params.pipe(
    map(params => params[selectedPlayerIdRouteParamName]),
    switchMap(id => this.ps.playerWithStats(id)),
    shareReplay()
  );

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

  playerGameTableData: Observable<PlayerDataByGame[]> =
    this.player.pipe(
      map(p =>
        p.games.map(g => ({
          name: g.name,
          location: g.location,
          date: g.date,
          shots: p.shotsOnGoal.filter(s => s.game === g.id).length,
          goals: p.shotsOnGoal
            .filter(s => s.game === g.id)
            .filter(sog => sog.scored).length,
          assists: p.assists.filter(s => s.game === g.id).length,
          redCard:
            p.cards.filter(
              c => c.game === g.id && c.type === cardTypes['red']
            ).length > 0,
          yellowCard:
            p.cards.filter(
              c => c.game === g.id && c.type === cardTypes['yellow']
            ).length > 0
        }))
      )
    );

  canDelete = merge(
    this.playerGameTableData.pipe(
      map(td =>
        td.length > 0
          ? 'Cannot delete a player that has games'
          : undefined
      )
    ),
    this.deleting
  ).pipe(startWith('Loading player data'), shareReplay());

  updateName(newName: string) {
    return this.ps.changePlayerName(
      this.ar.snapshot.params[selectedPlayerIdRouteParamName],
      newName
    );
  }

  async delete() {
    this.deleting.next('Deletion in progress');
    try {
      await this.ps.deletePlayer(
        this.ar.snapshot.params[selectedPlayerIdRouteParamName]
      );
      await this.router.navigate(['players']);
    } catch (_err) {
      this.deleting.next('');
    }
  }
}
