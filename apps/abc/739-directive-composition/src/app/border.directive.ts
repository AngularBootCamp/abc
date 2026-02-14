import { Directive, model } from '@angular/core';

@Directive({
  selector: '[appBorder]',
  host: {
    '[style.border]': 'getBorderColor()'
  }
})
export class BorderDirective {
  readonly color = model('var(--abc-border-color)');

  getBorderColor() {
    return `5px solid ${this.color()}`;
  }
}
