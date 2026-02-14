import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule
} from '@angular/forms';

import { FormDeactivateCheck } from './form-deactivate.guard';

@Component({
  selector: 'app-big-form',
  templateUrl: './big-form.component.html',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BigFormComponent implements FormDeactivateCheck {
  protected readonly bigFormGroup = inject(
    NonNullableFormBuilder
  ).group({
    importantInfo: ['This is important information!']
  });

  protected savedFormValue = this.bigFormGroup.value;

  public hasUnsavedChanges() {
    return this.bigFormGroup.dirty;
  }

  protected saveChanges() {
    this.savedFormValue = this.bigFormGroup.value;
    this.bigFormGroup.reset(this.bigFormGroup.value);
  }

  protected discardChanges() {
    this.bigFormGroup.reset(this.savedFormValue);
  }
}
