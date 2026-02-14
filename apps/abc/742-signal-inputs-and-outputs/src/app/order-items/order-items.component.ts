import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';

import { Item } from '../api-types';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderItemsComponent {
  public readonly items = input.required<Item[]>();
}
