import { Directive, model } from '@angular/core';

@Directive({
  selector: '[appBorder]',
  host: {
    '[style.border]': 'getBorderColor()'
  }
})
export class BorderDirective {
  public readonly color = model('var(--abc-border-color)');

  protected getBorderColor() {
    return `5px solid ${this.color()}`;
  }
}
