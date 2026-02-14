import {
  Component,
  numberAttribute,
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
  // Defaults to property name = variable name, but can be
  // aliased with input({alias: 'name'}).
  public readonly orders = input.required<Order[]>();

  // This could be derived from orders, but we want to show the
  // transform.
  public readonly count = input.required<number, unknown>({
    transform: numberAttribute
  });
}
