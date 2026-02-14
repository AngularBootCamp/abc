import {
  Component,
  Input,
  booleanAttribute,
  numberAttribute
} from '@angular/core';

@Component({
  selector: 'app-built-in-transforms',
  template: `
    <strong>{{ explanation }}</strong>
    <br />
    Boolean: {{ booleanValue }}
    <br />
    Number: {{ numberValue }}
  `
})
export class BuiltInTransformsComponent {
  @Input({ required: true }) explanation!: string;

  @Input({ required: true, transform: booleanAttribute })
  booleanValue!: boolean;

  @Input({ required: true, transform: numberAttribute })
  numberValue = 0;
}
