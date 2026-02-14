import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  imports: [ReactiveFormsModule]
})
export class FormSelectComponent {
  readonly control = input.required<FormControl<any>>();
  readonly label = input.required<string>();
  readonly options = input.required<string[]>();
}
