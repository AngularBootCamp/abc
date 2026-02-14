import { Component, inject, signal } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule
} from '@angular/forms';

import { FormSelectComponent } from './form-select/form-select.component';
import { FormToppingsComponent } from './form-toppings/form-toppings.component';

type PizzaFormGroup = FormGroup<{
  size: FormControl<string>;
  crust: FormControl<string>;
  sauceType: FormControl<string>;
  sauceAmount: FormControl<string>;
  cheeseType: FormControl<string>;
  cheeseAmount: FormControl<string>;
  toppings: FormArray<FormControl<string>>;
}>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    ReactiveFormsModule,
    FormSelectComponent,
    FormToppingsComponent
  ]
})
export class AppComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  protected pizzasFormArray = this.fb.array<PizzaFormGroup>([]);
  protected activePizza = 0;

  protected readonly sizes = signal([
    'Extra Small',
    'Small',
    'Medium',
    'Large',
    'Extra Large'
  ]);
  protected readonly crusts = signal([
    'Original',
    'Thin',
    'Cheese Filled',
    'Gluten-Free'
  ]);
  protected readonly sauceTypes = signal([
    'None',
    'Original',
    'White Sauce',
    'BBQ',
    'Ranch'
  ]);
  protected readonly sauceAmounts = signal([
    'Normal',
    'Light',
    'Extra'
  ]);
  protected readonly cheeseTypes = signal([
    'None',
    'Original',
    '3-Cheese Blend',
    'Parmesan'
  ]);
  protected readonly cheeseAmounts = signal([
    'Normal',
    'Light',
    'Extra'
  ]);

  constructor() {
    this.addNewPizza();
  }

  protected logForm() {
    console.log(this.pizzasFormArray.value);
  }

  protected addNewPizza() {
    this.pizzasFormArray.push(
      this.fb.group({
        size: this.fb.control(''),
        crust: this.fb.control(''),
        sauceType: this.fb.control(''),
        sauceAmount: this.fb.control(''),
        cheeseType: this.fb.control(''),
        cheeseAmount: this.fb.control(''),
        toppings: this.fb.array([this.fb.control('')])
      })
    );
    this.activePizza = this.pizzasFormArray.length - 1;
  }

  protected removePizza(index: number) {
    this.pizzasFormArray.removeAt(index);
    this.activePizza = -1;
  }

  protected setActivePizzaForm(index: number) {
    if (this.activePizza === index) {
      this.activePizza = -1;
    } else {
      this.activePizza = index;
    }
  }
}
