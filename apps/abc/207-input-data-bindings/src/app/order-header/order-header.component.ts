import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderHeaderComponent {
  public readonly customer = input.required<string>({
    // eslint-disable-next-line @angular-eslint/no-input-rename
    alias: 'customerName'
  });
}
