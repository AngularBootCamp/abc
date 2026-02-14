import { Component, input } from '@angular/core';

import { Item } from '../api-types';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html'
})
export class OrderItemsComponent {
  readonly items = input.required<Item[]>();
}
