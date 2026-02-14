import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { CardWithName, Player } from '../../api-types';
import {
  AddCardToGameComponent,
  AddCardToGameData
} from '../add-card-to-game/add-card-to-game.component';

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

  addShot() {
    const data: AddCardToGameData = {
      gameId: this.gameId,
      existingPlayers: this.players
    };
    this.dialog.open(AddCardToGameComponent, { data }).afterClosed();
  }
}
