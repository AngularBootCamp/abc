import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
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
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { CardType, Player } from '../../api-types';
import { cardTypes } from '../../feature.constants';
import { GameService } from '../../game.service';

export interface AddCardToGameData {
  gameId: string;
  existingPlayers: Player[];
}

@Component({
  selector: 'app-add-card-to-game',
  templateUrl: './add-card-to-game.component.html',
  styleUrl: './add-card-to-game.component.scss',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class AddCardToGameComponent {
  private dialogRef =
    inject<MatDialogRef<AddCardToGameComponent>>(MatDialogRef);
  data = inject<AddCardToGameData>(MAT_DIALOG_DATA);
  private gs = inject(GameService);
  private fb = inject(NonNullableFormBuilder);

  cardForm = this.fb.group({
    player: ['', Validators.required],
    type: ['yellow' as CardType],
    minute: [0, Validators.required]
  });
  saving = false;
  cardtypes = Object.keys(cardTypes).map(k => cardTypes[k]);

  save() {
    this.saving = true;
    this.gs
      .addCardToGame({
        game: this.data.gameId,
        ...this.cardForm.value
      })
      .then(() => this.dialogRef.close())
      .catch(e => {
        console.log(e);
        this.saving = false;
      });
  }
}
