import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forbidden-component',
  template: `
    <article>
      <header>Access Forbidden</header>
      <p>Sorry, you don't have access to App Administration :-(</p>
      <p><a routerLink="/home">Return to Home</a></p>
    </article>
  `,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForbiddenComponent {}
