import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
  RouterLinkActive,
  RouterLink,
  RouterOutlet
} from '@angular/router';

import { GameService } from '../../game.service';
import { AddGameComponent } from '../add-game/add-game.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    RouterLinkActive,
    RouterLink,
    RouterOutlet
  ]
})
export class GamesComponent {
  private gs = inject(GameService);
  private dialog = inject(MatDialog);

  games = this.gs.games;

  addGame() {
    this.dialog.open(AddGameComponent);
  }
}
