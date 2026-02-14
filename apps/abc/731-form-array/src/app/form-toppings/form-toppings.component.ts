import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input
} from '@angular/core';
import {
  FormArray,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-form-toppings',
  templateUrl: './form-toppings.component.html',
  styleUrl: './form-toppings.component.scss',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormToppingsComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  public readonly toppings =
    input.required<FormArray<FormControl<string>>>();

  protected get toppingControls() {
    return (this.toppings().controls ?? []) as FormControl[];
  }

  protected addNewTopping() {
    this.toppings().push(this.fb.control(''));
  }

  protected removeTopping(toppingIndex: number) {
    this.toppings().removeAt(toppingIndex);
  }
}
