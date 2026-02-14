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

import { GameModalTransfer, Player } from '../../app.types';
import { AddPlayerToGameComponent } from '../add-player-to-game/add-player-to-game.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  imports: [MatListModule, MatButtonModule, MatIconModule]
})
export class PlayerListComponent {
  private dialog = inject(MatDialog);

  @Input({ required: true }) players!: Player[];
  @Input({ required: true }) playersNotInGame!: Player[];
  @Input({ required: true }) gameId: string | undefined;
  @Output() playerListUpdated = new EventEmitter<void>();

  addPlayer() {
    if (this.gameId) {
      const game: GameModalTransfer = {
        id: this.gameId,
        players: this.playersNotInGame
      };
      this.dialog
        .open(AddPlayerToGameComponent, { data: game })
        .afterClosed();
    }
  }
}
