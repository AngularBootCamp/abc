import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSelectComponent {
  public readonly control = input.required<FormControl<any>>();
  public readonly label = input.required<string>();
  public readonly options = input.required<string[]>();
}
