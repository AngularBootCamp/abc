import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { JsonPipe } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { fiveValidator, matchingPasswordValidator } from './validators';
// import { trivialValidator, matchingFieldValidator } from './validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ReactiveFormsModule, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly loginFormGroup = inject(NonNullableFormBuilder).group(
    {
      login: ['user', Validators.required],
      password: [
        'defaultPass',
        [Validators.minLength(3), Validators.required],
      ],
      enterFive: ['5', fiveValidator],
      confirmPassword: ['pass', Validators.minLength(3)],
    },
    {
      validators: matchingPasswordValidator,
      // validators: matchingFieldValidator('password', 'confirmPassword', 'mismatched')
    },
  );

  protected onLogin(): void {
    console.log('Form Submitted', this.loginFormGroup.value);
  }

  protected logTheForm(): void {
    console.log('form: ', this.loginFormGroup);
  }
}
