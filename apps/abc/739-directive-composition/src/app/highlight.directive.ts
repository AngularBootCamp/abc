import { Directive, model } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '[style.backgroundColor]': 'getBackgroundColor()'
  }
})
export class HighlightDirective {
  readonly color = model('var(--abc-highlight-color)');

  getBackgroundColor() {
    return this.color();
  }
}
