import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-component',
  template: `
    <article>
      <header>Welcome Home</header>
      This is a simple example component.
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {}
