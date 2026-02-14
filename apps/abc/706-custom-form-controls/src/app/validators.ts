import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors
} from '@angular/forms';

export function trivialValidator(
  control: FormControl
): ValidationErrors | null {
  if (control.value === '12345') {
    return null;
  } else {
    return {
      trivial: true
    };
  }
}

export function fiveValidator(
  control: FormControl
): ValidationErrors | null {
  if (control.value !== '5') {
    return {
      verifyFive: true
    };
  }
  return null;
}

export function matchingPasswordValidator(
  group: AbstractControl
): ValidationErrors | null {
  const first = group.get('password');
  const second = group.get('confirmPassword');
  if (first?.value !== second?.value) {
    return {
      mismatched: true
    };
  }
  return null;
}

export function matchingFieldValidator(
  firstKey: string,
  secondKey: string,
  errorName: string
) {
  return (group: FormGroup): ValidationErrors | null => {
    const first = group.controls[firstKey];
    const second = group.controls[secondKey];
    if (first?.value !== second?.value) {
      return {
        [errorName]: true
      };
    }
    return null;
  };
}
