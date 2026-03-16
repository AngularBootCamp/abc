/* eslint-disable @angular-eslint/prefer-standalone */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hr-files-search',
  template: `
    <article>
      <header>HR Functionality</header>
      <p>Search for Employee HR Records</p>
      <app-search-box />
    </article>
  `,
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HrFilesSearchComponent {}
