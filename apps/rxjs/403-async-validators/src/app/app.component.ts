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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { HeaderComponent } from '@class-materials/shared/ui-page-header';

import {
  simpleAsyncValidator,
  slowAsyncValidator,
  westernZipValidatorFactory
} from './asyncValidators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    HeaderComponent,
    JsonPipe,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class AppComponent {
  inputFormGroup: FormGroup<{
    requiredInput: FormControl<string>;
    input: FormControl<string>;
    zip: FormControl<string>;
  }>;

  constructor() {
    const http = inject(HttpClient);
    const fb = inject(NonNullableFormBuilder);

    this.inputFormGroup = fb.group({
      requiredInput: ['', Validators.required, simpleAsyncValidator],
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
