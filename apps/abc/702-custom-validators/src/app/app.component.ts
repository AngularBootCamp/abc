import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import {
  fiveValidator,
  matchingPasswordValidator
} from './validators';
// import { trivialValidator, matchingFieldValidator } from './validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ReactiveFormsModule, JsonPipe]
})
export class AppComponent {
  loginFormGroup: FormGroup<{
    login: FormControl<string>;
    password: FormControl<string>;
    enterFive: FormControl<string>;
    confirmPassword: FormControl<string>;
  }> = inject(NonNullableFormBuilder).group(
    {
      login: ['user', Validators.required],
      password: [
        'defaultPass',
        [Validators.minLength(3), Validators.required]
      ],
      enterFive: ['5', fiveValidator],
      confirmPassword: ['pass', Validators.minLength(3)]
    },
    {
      validators: matchingPasswordValidator
      // validators: matchingFieldValidator('password', 'confirmPassword', 'mismatched')
    }
  );

  onLogin(): void {
    console.log('Form Submitted', this.loginFormGroup.value);
  }

  logTheForm(): void {
    console.log('form: ', this.loginFormGroup);
  }
}
