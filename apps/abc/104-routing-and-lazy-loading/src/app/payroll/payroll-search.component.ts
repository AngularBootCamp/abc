import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SearchBoxComponent } from '../search/search-box.component';

@Component({
  selector: 'app-payroll-search',
  template: `
    <article>
      <header>Payroll Functionality</header>
      <p>Search for Employee Payroll Records</p>
      <app-search-box />
    </article>
  `,
  imports: [SearchBoxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PayrollSearchComponent {}
