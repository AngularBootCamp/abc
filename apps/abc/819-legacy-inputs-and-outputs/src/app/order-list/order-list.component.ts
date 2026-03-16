/* eslint-disable
   @angular-eslint/prefer-signals,
   @angular-eslint/prefer-output-emitter-ref,
   @angular-eslint/prefer-output-readonly,
   @typescript-eslint/explicit-member-accessibility
-- This is an example of legacy code
*/
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Order } from '../api-types';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent {
  @Input({ required: true }) orders!: Order[];

  @Output() selectOrder = new EventEmitter<Order>();

  // -------- external API above, internal implementation below

  protected pickOrder(order: Order) {
    this.selectOrder.emit(order);
  }
}
