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
  protected readonly name = new FormControl('', Validators.required);
  protected readonly outputValue = signal('');

  protected setValue() {
    this.name.setValue('Set from code');
  }

  protected useValue() {
    this.outputValue.set('testing 123 - ' + this.name.value);
  }
}
