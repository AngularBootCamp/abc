import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
  RouterLinkActive,
  RouterLink,
  RouterOutlet
} from '@angular/router';

import { AddPlayerComponent } from '../add-player/add-player.component';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss',
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ]
})
export class PlayersComponent {
  private ps = inject(PlayerService);
  private dialog = inject(MatDialog);

  players = this.ps.players;

  addPlayer() {
    this.dialog.open(AddPlayerComponent);
  }
}
