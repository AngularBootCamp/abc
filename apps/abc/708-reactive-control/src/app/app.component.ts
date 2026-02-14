import { Component, signal } from '@angular/core';
import {
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ReactiveFormsModule]
})
export class AppComponent {
  name = new FormControl('', Validators.required);
  outputValue = signal('');

  setValue() {
    this.name.setValue('Set from code');
  }

  useValue() {
    this.outputValue.set('testing 123 - ' + this.name.value);
  }
}
