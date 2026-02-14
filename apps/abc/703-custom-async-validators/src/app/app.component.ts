import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
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
  protected readonly inputFormGroup = inject(
    NonNullableFormBuilder
  ).group({
    input: ['', Validators.nullValidator, simpleAsyncValidator],
    zip: [
      '',
      [
        Validators.minLength(5),
        Validators.maxLength(5),
        Validators.required
      ],
      [
        slowAsyncValidator,
        westernZipValidatorFactory(inject(HttpClient))
      ]
    ]
  });

  protected onFormSubmit(): void {
    console.log('submitted', this.inputFormGroup.value);
  }

  protected logTheForm(): void {
    console.log('form', this.inputFormGroup);
  }
}
