import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-search-box',
  template: `
    <input type="search" placeholder="Search" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent {}
