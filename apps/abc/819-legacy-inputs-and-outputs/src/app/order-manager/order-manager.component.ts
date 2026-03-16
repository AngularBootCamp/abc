import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Order, fakeApiOrders } from '../api-types';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { OrderListComponent } from '../order-list/order-list.component';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  imports: [OrderListComponent, OrderDetailsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderManagerComponent {
  protected orderList = fakeApiOrders;
  protected selectedOrder: Order | undefined;

  protected setOrder(order: Order) {
    this.selectedOrder = order;
  }
}
