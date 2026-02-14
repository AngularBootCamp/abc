import { Component } from '@angular/core';

@Component({
  selector: 'app-hr-files-search',
  template: `
    <article>
      <header>HR Functionality</header>
      <p>Search for Employee HR Records</p>
      <app-search-box />
    </article>
  `,
  standalone: false
})
export class HrFilesSearchComponent {}
