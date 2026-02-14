import { Component } from '@angular/core';

import { OrderManagerComponent } from './order-manager/order-manager.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [OrderManagerComponent]
})
export class AppComponent {}
