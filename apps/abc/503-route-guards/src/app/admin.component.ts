import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-component',
  template: `
    <article>
      <header>App Administration</header>
      Welcome, Authorized User!
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {}
