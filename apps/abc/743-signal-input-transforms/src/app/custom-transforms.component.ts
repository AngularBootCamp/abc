import { Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-transforms',
  template: `
    Lower: {{ lowerString() }}
    <br />
    Upper: {{ upperStringInline() }}
  `
})
export class CustomTransformsComponent {
  readonly upperStringInline = input.required({
    // transforms can be inline pure functions
    transform: (value: string) => value.toLocaleUpperCase()
  });

  readonly lowerString = input.required({ transform: toLower });
}

// transforms can be named pure functions
function toLower(value: string) {
  return value.toLocaleLowerCase();
}
