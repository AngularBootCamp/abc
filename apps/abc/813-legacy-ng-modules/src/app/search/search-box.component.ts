/* eslint-disable @angular-eslint/prefer-standalone */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-search-box',
  template: ` <input type="search" placeholder="Search" /> `,
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {}
