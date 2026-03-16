import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-content-wrapper',
  template: `
    <article>
      <header>I wrap content</header>
      <ng-content />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentWrapperComponent {}
