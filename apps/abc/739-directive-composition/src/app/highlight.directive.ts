import { Directive, model } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '[style.backgroundColor]': 'getBackgroundColor()'
  }
})
export class HighlightDirective {
  public readonly color = model('var(--abc-highlight-color)');

  protected getBackgroundColor() {
    return this.color();
  }
}
