import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  input,
  numberAttribute,
} from '@angular/core';

@Component({
  selector: 'app-built-in-transforms',
  template: `
    <strong>{{ explanation() }}</strong>
    <br />
    Boolean: {{ booleanValue() }}
    <br />
    Number: {{ numberValue() }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuiltInTransformsComponent {
  public readonly explanation = input.required<string>();

  public readonly booleanValue = input(false, {
    transform: booleanAttribute,
  });

  public readonly numberValue = input(0, {
    transform: numberAttribute,
  });
}
