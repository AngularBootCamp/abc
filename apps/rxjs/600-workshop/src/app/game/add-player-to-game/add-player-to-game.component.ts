import { Component, inject } from '@angular/core';
import {
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { GameModalTransfer } from '../../app.types';
import { GameService } from '../game.service';

@Component({
  selector: 'app-add-player-to-game',
  templateUrl: './add-player-to-game.component.html',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class AddPlayerToGameComponent {
  private dialogRef =
    inject<MatDialogRef<AddPlayerToGameComponent>>(MatDialogRef);
  private gameService = inject(GameService);
  game = inject<GameModalTransfer>(MAT_DIALOG_DATA);

  playerOptions = this.game.players;
  chosenPlayer = new FormControl('', {
    nonNullable: true,
    validators: Validators.required
  });
  saving = false;

  async save() {
    this.saving = true;
    try {
      await this.gameService.addPlayerToGame(
        this.game.id,
        this.chosenPlayer.value
      );
      this.dialogRef.close();
    } catch (e) {
      console.log(e);
    } finally {
      this.saving = false;
    }
  }
}
