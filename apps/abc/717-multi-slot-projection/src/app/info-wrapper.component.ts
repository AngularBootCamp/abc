import { Component } from '@angular/core';

@Component({
  selector: 'app-info-wrapper',
  styles: [
    '.outer { border: 3px solid var(--abc-info-color); }',
    '.inner { border: 3px dotted var(--abc-info-color); }'
  ],
  template: `
    <article class="outer">
      <h2>
        <ng-content select="app-info-wrapper-heading"></ng-content>
      </h2>
      <article class="inner">
        <ng-content select="app-info-wrapper-content"></ng-content>
      </article>
    </article>
  `
})
export class InfoWrapperComponent {}

@Component({
  selector: 'app-info-wrapper-heading, app-info-wrapper-content',
  template: `
    <ng-content></ng-content>
  `
})
export class InfoWrapperChildrenComponent {}
