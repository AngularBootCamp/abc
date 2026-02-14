import { AsyncPipe } from '@angular/common';
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
import { map } from 'rxjs';

import { Player } from '../../api-types';
import { GameService } from '../../game.service';
import { PlayerService } from '../../player.service';

export interface AddPlayerToGameData {
  gameId: string;
  existingPlayers: Player[];
}

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
    MatProgressSpinnerModule,
    AsyncPipe
  ]
})
export class AddPlayerToGameComponent {
  private dialogRef =
    inject<MatDialogRef<AddPlayerToGameComponent>>(MatDialogRef);
  data = inject<AddPlayerToGameData>(MAT_DIALOG_DATA);
  private ps = inject(PlayerService);
  private gs = inject(GameService);

  playerOptions = this.ps.players.pipe(
    map(players =>
      players.filter(
        p => !this.data.existingPlayers.find(x => x.id === p.id)
      )
    )
  );
  chosenPlayer = new FormControl('', {
    nonNullable: true,
    validators: Validators.required
  });
  saving = false;

  save() {
    this.saving = true;
    this.gs
      .addPlayerToGame(this.data.gameId, this.chosenPlayer.value)
      .then(() => this.dialogRef.close())
      .catch(e => {
        console.log(e);
        this.saving = false;
      });
  }
}
