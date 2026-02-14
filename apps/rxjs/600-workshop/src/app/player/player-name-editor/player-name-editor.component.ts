import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-player-name-editor',
  templateUrl: './player-name-editor.component.html',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule]
})
export class PlayerNameEditorComponent implements AfterViewChecked {
  @Input({ required: true }) set playerName(p: string) {
    this.playerNameEdit.setValue(p);
    this.playerNameCache = p;
  }
  @Output() playerNameChanged = new EventEmitter<string>();
  @ViewChild(MatInput, { static: true }) input!: MatInput;

  playerNameCache!: string;
  playerNameEdit = new FormControl('', {
    nonNullable: true,
    validators: Validators.required
  });
  editing = false;

  startEditingName() {
    this.editing = true;
  }

  ngAfterViewChecked() {
    if (this.input && !this.input.focused) {
      setTimeout(() => this.input.focus());
    }
  }

  save() {
    this.editing = false;
    if (this.playerNameEdit.valid) {
      if (this.playerNameCache !== this.playerNameEdit.value) {
        this.playerNameChanged.emit(this.playerNameEdit.value);
        this.playerNameCache = this.playerNameEdit.value;
      }
    } else {
      this.playerNameEdit.setValue(this.playerNameCache);
    }
  }
}
