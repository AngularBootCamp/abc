import { Component } from '@angular/core';

@Component({
  selector: 'app-second',
  template: `
    <div class="outline-box">Second Component</div>
  `,
  styles: `
    .outline-box {
      border: 3px solid var(--abc-category-2-color);
    }
    :host {
      display: block;
      border: 3px solid var(--abc-border-color);
    }
  `
})
export class SecondComponent {}
