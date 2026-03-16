import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  input,
  output,
} from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FocusInputDirective } from './focus-input.directive';

@Component({
  selector: 'oasis-display-or-edit',
  templateUrl: './display-or-edit.component.html',
  styleUrls: ['./display-or-edit.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FocusInputDirective,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayOrEditComponent {
  public readonly control = input.required<FormControl>();
  public readonly useTextArea = input(false, {
    transform: booleanAttribute,
  });
  public readonly useDelete = input(false, {
    transform: booleanAttribute,
  });
  public readonly actionsPosition = input<'before' | 'after'>('before');

  public readonly updated = output<void>();
  public readonly deleteClicked = output<void>();

  protected editing = false;

  finishEdit() {
    this.editing = false;
    this.updated.emit();
  }
}
