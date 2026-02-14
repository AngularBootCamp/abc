import { Component, inject } from '@angular/core';
import {
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import moment from 'moment';

import { GameService } from '../game.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.scss',
  imports: [
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ]
})
export class AddGameComponent {
  private dialogRef =
    inject<MatDialogRef<AddGameComponent>>(MatDialogRef);
  private gameService = inject(GameService);

  saving = false;
  locationInput = new FormControl('', {
    nonNullable: true,
    validators: Validators.required
  });
  dateInput = new FormControl(moment(), {
    nonNullable: true,
    validators: Validators.required
  });
  nameInput = new FormControl('', {
    nonNullable: true,
    validators: Validators.required
  });

  async save() {
    this.saving = true;
    try {
      await this.gameService.addGame(
        this.locationInput.value,
        this.dateInput.value.format('YYYY-MM-DD'),
        this.nameInput.value
      );
      this.dialogRef.close();
    } catch (e) {
      console.log(e);
    } finally {
      this.saving = false;
    }
  }
}
