import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy
} from '@angular/core';
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
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsStatesSelectorComponent
  implements ControlValueAccessor, OnDestroy
{
  protected usStates: UsStates[] = usStates;
  protected readonly selectedState = new FormControl();
  protected onChange: any;
  protected onTouched: any;

  // When data in the inner form control changes, update the outside form control.
  private readonly sub = this.selectedState.valueChanges.subscribe(
    v => this.onChange && this.onChange(v)
  );

  // When data changes from the outside, update the inner form control.
  public writeValue(obj: any): void {
    this.selectedState.setValue(obj);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // When the outside disabled state is set, disable/enable the inner form control
  public setDisabledState(isDisabled: boolean) {
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
