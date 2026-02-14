import { Component, inject } from '@angular/core';

import { BorderDirective } from './border.directive';
import { HighlightDirective } from './highlight.directive';

@Component({
  selector: 'app-highlight-and-border-di',
  template: `
    <p>
      <span class="description">
        Component defining border and highlight with dependency
        injection
      </span>
    </p>
  `,
  hostDirectives: [HighlightDirective, BorderDirective]
})
export class HighlightAndBorderDiComponent {
  highlight = inject(HighlightDirective);
  border = inject(BorderDirective);

  constructor() {
    this.highlight.color.set('var(--abc-category-7-color)');
    this.border.color.set('var(--abc-category-8-color)');
  }
}
