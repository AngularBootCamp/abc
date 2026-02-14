import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import {
  CardWithName,
  GameModalTransfer,
  Player
} from '../../app.types';
import { AddCardToGameComponent } from '../add-card-to-game/add-card-to-game.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  imports: [MatTableModule, MatButtonModule, MatIconModule]
})
export class CardListComponent {
  private dialog = inject(MatDialog);

  @Input({ required: true }) cards!: CardWithName[];
  @Input({ required: true }) gameId!: string;
  @Input({ required: true }) players!: Player[];
  displayedColumns = ['player', 'color', 'minute'];

  addCard() {
    const game: GameModalTransfer = {
      id: this.gameId,
      players: this.players
    };
    const config: MatDialogConfig = { data: game };
    this.dialog.open(AddCardToGameComponent, config).afterClosed();
  }
}
