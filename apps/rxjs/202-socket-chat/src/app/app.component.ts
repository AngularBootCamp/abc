import { Component } from '@angular/core';

import { HeaderComponent } from '@class-materials/shared/ui-page-header';

import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ChatComponent, HeaderComponent]
})
export class AppComponent {}
