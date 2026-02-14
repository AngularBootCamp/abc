import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { Player } from '../../api-types';
import {
  AddPlayerToGameComponent,
  AddPlayerToGameData
} from '../add-player-to-game/add-player-to-game.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  imports: [MatListModule, MatButtonModule, MatIconModule]
})
export class PlayerListComponent {
  private dialog = inject(MatDialog);

  @Input({ required: true }) players!: Player[];
  @Input({ required: true }) gameId!: string;

  @Output() playerListUpdated = new EventEmitter<void>();

  addPlayer() {
    const data: AddPlayerToGameData = {
      gameId: this.gameId,
      existingPlayers: this.players
    };
    this.dialog
      .open(AddPlayerToGameComponent, { data })
      .afterClosed();
  }
}
