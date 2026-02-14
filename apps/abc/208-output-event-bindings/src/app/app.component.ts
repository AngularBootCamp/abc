import { ChangeDetectionStrategy, Component } from '@angular/core';

import { OrderManagerComponent } from './order-manager/order-manager.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [OrderManagerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
