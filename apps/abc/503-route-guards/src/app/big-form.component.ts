import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule
} from '@angular/forms';

import { FormDeactivateCheck } from './form-deactive.guard';

@Component({
  selector: 'app-big-form',
  templateUrl: './big-form.component.html',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BigFormComponent implements FormDeactivateCheck {
  bigFormGroup: FormGroup<{
    importantInfo: FormControl<string>;
  }> = inject(NonNullableFormBuilder).group({
    importantInfo: ['This is important information!']
  });

  savedFormValue = this.bigFormGroup.value;

  hasUnsavedChanges() {
    return this.bigFormGroup.dirty;
  }

  saveChanges() {
    this.savedFormValue = this.bigFormGroup.value;
    this.bigFormGroup.reset(this.bigFormGroup.value);
  }

  discardChanges() {
    this.bigFormGroup.reset(this.savedFormValue);
  }
}
