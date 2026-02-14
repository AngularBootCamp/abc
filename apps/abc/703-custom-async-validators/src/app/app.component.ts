import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import {
  simpleAsyncValidator,
  slowAsyncValidator,
  westernZipValidatorFactory
} from './asyncValidators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ReactiveFormsModule, JsonPipe]
})
export class AppComponent {
  inputFormGroup: FormGroup<{
    input: FormControl<string>;
    zip: FormControl<string>;
  }>;

  constructor() {
    const http = inject(HttpClient);
    const fb = inject(NonNullableFormBuilder);

    this.inputFormGroup = fb.group({
      input: ['', Validators.nullValidator, simpleAsyncValidator],
      zip: [
        '',
        [
          Validators.minLength(5),
          Validators.maxLength(5),
          Validators.required
        ],
        [slowAsyncValidator, westernZipValidatorFactory(http)]
      ]
    });
  }

  onFormSubmit(): void {
    console.log('submitted', this.inputFormGroup.value);
  }

  logTheForm(): void {
    console.log('form', this.inputFormGroup);
  }
}
