import { Component, input } from '@angular/core';

import { Order } from '../api-types';
import { OrderHeaderComponent } from '../order-header/order-header.component';
import { OrderItemsComponent } from '../order-items/order-items.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  imports: [OrderHeaderComponent, OrderItemsComponent]
})
export class OrderDetailsComponent {
  readonly sod = input.required<Order | undefined>({
    // eslint-disable-next-line @angular-eslint/no-input-rename
    alias: 'selectedOrderDetails'
  });
}
