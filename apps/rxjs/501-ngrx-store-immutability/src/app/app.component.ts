import { Component } from '@angular/core';

import { HeaderComponent } from '@class-materials/shared/ui-page-header';

import { NotificationManagerComponent } from './notification-manager/notification-manager.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HeaderComponent, NotificationManagerComponent]
})
export class AppComponent {}
