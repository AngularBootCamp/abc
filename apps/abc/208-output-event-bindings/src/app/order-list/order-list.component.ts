import {
  Component,
  output,
  input,
  ChangeDetectionStrategy
} from '@angular/core';

import { Order } from '../api-types';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent {
  public readonly orders = input.required<Order[]>();

  public readonly selectOrder = output<Order>();

  // -------- external API above, internal implementation below

  protected pickOrder(order: Order) {
    this.selectOrder.emit(order);
  }
}
