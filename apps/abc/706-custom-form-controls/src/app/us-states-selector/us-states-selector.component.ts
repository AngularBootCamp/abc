import { Component, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';

import { usStates, UsStates } from './us-states';

@Component({
  selector: 'app-us-states-selector',
  templateUrl: './us-states-selector.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UsStatesSelectorComponent,
      multi: true
    }
  ],
  imports: [ReactiveFormsModule]
})
export class UsStatesSelectorComponent
  implements ControlValueAccessor, OnDestroy
{
  usStates: UsStates[] = usStates;
  selectedState = new FormControl();
  onChange: any;
  onTouched: any;

  // When data in the inner form control changes, update the outside form control.
  sub = this.selectedState.valueChanges.subscribe(
    v => this.onChange && this.onChange(v)
  );

  // When data changes from the outside, update the inner form control.
  writeValue(obj: any): void {
    this.selectedState.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // When the outside disabled state is set, disable/enable the inner form control
  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.selectedState.disable();
    } else {
      this.selectedState.enable();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
