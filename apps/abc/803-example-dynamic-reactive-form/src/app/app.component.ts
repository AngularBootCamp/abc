import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { exampleSchema } from './example-schema';
import { SchemaFormUtils } from './schema-form-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ReactiveFormsModule, JsonPipe]
})
export class AppComponent {
  // This could be loaded from an external source.
  schema = signal(exampleSchema);

  dynamicFormGroup = inject(FormBuilder).group(
    SchemaFormUtils.createControlsConfigFromSchema(this.schema())
  );

  // Make it easier to get to the form controls from the template.
  controls = this.dynamicFormGroup.controls;

  onSubmit(): void {
    console.log('Form Submitted', this.dynamicFormGroup.value);
  }

  logTheForm(): void {
    console.log('form: ', this.dynamicFormGroup);
  }
}
