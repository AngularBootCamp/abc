import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-some-name',
  template: `
    <article>
      <header>Hello Again!</header>
      This is another example component.
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameComponent {}
