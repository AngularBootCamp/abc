import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';

import { Order, fakeApiOrders } from '../api-types';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { OrderListComponent } from '../order-list/order-list.component';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  imports: [OrderListComponent, OrderDetailsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderManagerComponent {
  orderList = signal(fakeApiOrders);
  selectedOrder = signal<Order | undefined>(undefined);

  setOrder(order: Order) {
    this.selectedOrder.set(order);
  }
}
