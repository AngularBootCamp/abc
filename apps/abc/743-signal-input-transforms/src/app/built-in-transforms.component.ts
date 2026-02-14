import {
  Component,
  input,
  booleanAttribute,
  numberAttribute
} from '@angular/core';

@Component({
  selector: 'app-built-in-transforms',
  template: `
    <strong>{{ explanation() }}</strong>
    <br />
    Boolean: {{ booleanValue() }}
    <br />
    Number: {{ numberValue() }}
  `
})
export class BuiltInTransformsComponent {
  readonly explanation = input.required<string>();

  readonly booleanValue = input(false, {
    transform: booleanAttribute
  });

  readonly numberValue = input(0, { transform: numberAttribute });
}
