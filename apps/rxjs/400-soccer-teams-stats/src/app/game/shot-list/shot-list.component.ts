import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import {
  GameModalTransfer,
  Player,
  ShotOnGoalWithNames
} from '../../app.types';
import { AddShotToGameComponent } from '../add-shot-to-game/add-shot-to-game.component';

@Component({
  selector: 'app-shot-list',
  templateUrl: './shot-list.component.html',
  imports: [MatTableModule, MatButtonModule, MatIconModule]
})
export class ShotListComponent {
  private dialog = inject(MatDialog);

  @Input({ required: true }) shots!: ShotOnGoalWithNames[];
  @Input({ required: true }) gameId!: string;
  @Input({ required: true }) players!: Player[];
  displayedColumns = ['player', 'assist', 'successful', 'minute'];

  addShot() {
    const game: GameModalTransfer = {
      id: this.gameId,
      players: this.players
    };
    this.dialog
      .open(AddShotToGameComponent, { data: game })
      .afterClosed();
  }
}
