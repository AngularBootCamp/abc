import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ValidationErrors,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
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

import { Player } from '../../api-types';
import { GameService } from '../../game.service';

export interface AddShotToGameData {
  gameId: string;
  existingPlayers: Player[];
}

function CantAssistYourselfValidator(
  g: AbstractControl
): ValidationErrors | null {
  const player = g.get('player');
  const assist = g.get('assist');
  if (player && assist && player.value === assist.value) {
    return {
      cantAssistYourself: true
    };
  }
  return null;
}

@Component({
  selector: 'app-add-shot-to-game',
  templateUrl: './add-shot-to-game.component.html',
  styleUrl: './add-shot-to-game.component.scss',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class AddShotToGameComponent {
  private dialogRef =
    inject<MatDialogRef<AddShotToGameComponent>>(MatDialogRef);
  data = inject<AddShotToGameData>(MAT_DIALOG_DATA);
  private gs = inject(GameService);
  private fb = inject(NonNullableFormBuilder);

  shotForm = this.fb.group(
    {
      player: ['', Validators.required],
      assist: [''],
      scored: [true, Validators.required],
      minute: [0, Validators.required]
    },
    {
      validators: [CantAssistYourselfValidator]
    }
  );
  saving = false;

  save() {
    this.saving = true;
    this.gs
      .addShotToGame({
        game: this.data.gameId,
        ...this.shotForm.value
      })
      .then(() => this.dialogRef.close())
      .catch(e => {
        console.log(e);
        this.saving = false;
      });
  }
}
