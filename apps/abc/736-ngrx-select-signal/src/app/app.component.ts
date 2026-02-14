import { Component } from '@angular/core';

import { NotificationManagerComponent } from './notification-manager/notification-manager.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [NotificationManagerComponent]
})
export class AppComponent {}
