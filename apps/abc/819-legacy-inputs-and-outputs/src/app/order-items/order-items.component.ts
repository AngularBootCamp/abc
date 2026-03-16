/* eslint-disable @angular-eslint/prefer-signals, @typescript-eslint/explicit-member-accessibility
-- This is an example of legacy code
*/
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Item } from '../api-types';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderItemsComponent {
  @Input({ required: true }) items!: Item[];
}
