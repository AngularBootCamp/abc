/* eslint-disable @angular-eslint/prefer-signals, @typescript-eslint/explicit-member-accessibility
-- This is an example of legacy code
*/
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderHeaderComponent {
  /* eslint-disable-next-line @angular-eslint/no-input-rename */
  @Input({ required: true, alias: 'customerName' }) customer!: string;
}
