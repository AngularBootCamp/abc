import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html'
})
export class OrderHeaderComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ required: true, alias: 'customerName' }) customer!: string;
}
