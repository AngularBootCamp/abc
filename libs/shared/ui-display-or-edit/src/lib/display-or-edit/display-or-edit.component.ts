import {
  booleanAttribute,
  Component,
  output,
  input
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FocusInputDirective } from './focus-input.directive';

@Component({
  selector: 'oasis-display-or-edit',
  templateUrl: 'display-or-edit.component.html',
  styleUrls: ['display-or-edit.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FocusInputDirective,
    MatButtonModule,
    MatIconModule
  ]
})
export class DisplayOrEditComponent {
  readonly control = input.required<FormControl>();
  readonly useTextArea = input(false, {
    transform: booleanAttribute
  });
  readonly useDelete = input(false, { transform: booleanAttribute });
  readonly actionsPosition = input<'before' | 'after'>('before');

  readonly updated = output<void>();
  readonly deleteClicked = output<void>();

  editing = false;

  finishEdit() {
    this.editing = false;
    this.updated.emit();
  }
}
