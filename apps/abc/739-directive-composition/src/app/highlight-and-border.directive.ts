import { Directive } from '@angular/core';

import { BorderDirective } from './border.directive';
import { HighlightDirective } from './highlight.directive';

@Directive({
  selector: '[appHighlightAndBorder]',
  hostDirectives: [
    {
      directive: HighlightDirective,
      inputs: ['color: highlightColor']
    },
    {
      directive: BorderDirective,
      inputs: ['color: border']
    }
  ]
})
export class HighlightAndBorderDirective {}
