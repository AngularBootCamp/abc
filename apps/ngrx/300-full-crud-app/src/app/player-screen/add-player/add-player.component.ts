import { Component, inject } from '@angular/core';
import {
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PlayerService } from '../../player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class AddPlayerComponent {
  private dialogRef =
    inject<MatDialogRef<AddPlayerComponent>>(MatDialogRef);
  private ps = inject(PlayerService);

  playerInput = new FormControl('', {
    nonNullable: true,
    validators: Validators.required
  });
  saving = false;

  save() {
    this.saving = true;
    this.ps
      .addPlayer(this.playerInput.value)
      .then(() => this.dialogRef.close())
      .catch(e => {
        console.log(e);
        this.saving = false;
      });
  }
}
