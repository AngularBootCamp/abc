import { Component } from '@angular/core';

@Component({
  selector: 'app-content-wrapper',
  template: `
    <article>
      <header>I wrap content</header>
      <ng-content></ng-content>
    </article>
  `
})
export class ContentWrapperComponent {}
