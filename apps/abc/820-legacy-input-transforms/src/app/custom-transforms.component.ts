/* eslint-disable @angular-eslint/prefer-signals, @typescript-eslint/explicit-member-accessibility
-- This is an example of legacy code
*/
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-transforms',
  template: `
    Lower: {{ lowerString }}
    <br />
    Upper: {{ upperStringInline }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTransformsComponent {
  @Input({
    required: true,
    // transforms can be inline pure functions
    transform: (value: string) => value.toLocaleUpperCase(),
  })
  upperStringInline!: string;

  @Input({ required: true, transform: toLower }) lowerString!: string;
}

// transforms can be named pure functions
function toLower(value: string) {
  return value.toLocaleLowerCase();
}
