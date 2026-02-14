import { Component, input } from '@angular/core';

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html'
})
export class OrderHeaderComponent {
  readonly customer = input.required<string>({
    // eslint-disable-next-line @angular-eslint/no-input-rename
    alias: 'customerName'
  });
}
