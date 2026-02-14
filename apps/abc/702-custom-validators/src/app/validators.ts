import {
  AbstractControl,
  FormGroup,
  ValidationErrors
} from '@angular/forms';

export function trivialValidator(
  control: AbstractControl
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
  control: AbstractControl
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
  if (group instanceof FormGroup) {
    const first = group.get('password');
    const second = group.get('confirmPassword');
    if (first?.value !== second?.value) {
      return {
        mismatched: true
      };
    }
    return null;
  } else {
    throw Error(
      'Only use `matchingPasswordValidator` with FormGroups'
    );
  }
}

export function matchingFieldValidator(
  firstKey: string,
  secondKey: string,
  errorName: string
) {
  return (group: AbstractControl): ValidationErrors | null => {
    if (group instanceof FormGroup) {
      const first = group.controls[firstKey];
      const second = group.controls[secondKey];
      if (first?.value !== second?.value) {
        return {
          [errorName]: true
        };
      }
      return null;
    } else {
      throw Error(
        'Only use `matchingFieldValidator` with FormGroups'
      );
    }
  };
}
