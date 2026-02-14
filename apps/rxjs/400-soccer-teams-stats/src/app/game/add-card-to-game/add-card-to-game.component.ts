import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { cardTypes, cardTypesList } from '../../app.constants';
import { GameModalTransfer } from '../../app.types';
import { GameService } from '../game.service';

@Component({
  selector: 'app-add-card-to-game',
  templateUrl: './add-card-to-game.component.html',
  styleUrl: './add-card-to-game.component.scss',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class AddCardToGameComponent {
  private dialogRef =
    inject<MatDialogRef<AddCardToGameComponent>>(MatDialogRef);
  private gameService = inject(GameService);
  private fb = inject(NonNullableFormBuilder);
  game = inject<GameModalTransfer>(MAT_DIALOG_DATA);

  cardForm = this.fb.group({
    player: ['', Validators.required],
    type: [cardTypes['yellow']],
    minute: [0, Validators.required]
  });
  saving = false;
  cardtypes = cardTypesList;

  async save() {
    this.saving = true;
    try {
      await this.gameService.addCardToGame({
        game: this.game.id,
        ...this.cardForm.value
      });
      this.dialogRef.close();
    } catch (e) {
      console.log(e);
    } finally {
      this.saving = false;
    }
  }
}
