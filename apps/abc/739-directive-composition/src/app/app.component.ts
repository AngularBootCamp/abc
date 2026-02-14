import { Component } from '@angular/core';

import { BorderDirective } from './border.directive';
import { HighlightAndBorderDiComponent } from './highlight-and-border-di.component';
import { HighlightAndBorderInputsComponent } from './highlight-and-border-inputs.component';
import { HighlightAndBorderDirective } from './highlight-and-border.directive';
import { HighlightDirective } from './highlight.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    BorderDirective,
    HighlightAndBorderDirective,
    HighlightAndBorderDiComponent,
    HighlightAndBorderInputsComponent,
    HighlightDirective
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {}
