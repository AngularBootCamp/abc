import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { map, share, switchMap } from 'rxjs';

import { selectedGameIdRouteParamName } from '../../feature.constants';
import { GameService } from '../../game.service';
import { CardListComponent } from '../card-list/card-list.component';
import { PlayerListComponent } from '../player-list/player-list.component';
import { ShotListComponent } from '../shot-list/shot-list.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  imports: [
    AsyncPipe,
    CardListComponent,
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    PlayerListComponent,
    ShotListComponent
  ]
})
export class GameComponent {
  private gs = inject(GameService);
  private ar = inject(ActivatedRoute);
  private router = inject(Router);

  gameId = this.ar.params.pipe(
    map(p => p[selectedGameIdRouteParamName])
  );
  game = this.gameId.pipe(
    switchMap(id => this.gs.getGameWithDetails(id)),
    share()
  );
  deleting = false;

  delete() {
    this.deleting = true;
    this.gs
      .deleteGame(
        this.ar.snapshot.params[selectedGameIdRouteParamName]
      )
      .then(() => this.router.navigate(['games']))
      .catch(() => (this.deleting = false));
  }
}
