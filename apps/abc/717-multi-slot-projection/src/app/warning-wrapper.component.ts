import { Component } from '@angular/core';

@Component({
  selector: 'app-warning-wrapper',
  styles: 'article { border: 3px solid var(--abc-warning-color); }',
  template: `
    <article>
      <ng-content select="[header]"></ng-content>
      <ng-content select="[body]"></ng-content>
    </article>
  `
})
export class WarningWrapperComponent {}
