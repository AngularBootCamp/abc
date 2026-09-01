import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-second',
  template: `<div class="outline-box">Second Component</div>`,
  styles: `
    :host {
      display: block;
      border: 3px solid var(--abc-border-color);
    }

    .outline-box {
      border: 3px solid var(--abc-category-2-color);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondComponent {}
