import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AsyncPipe]
})
export class AppComponent {
  visitCount = inject(SocketService).message;
}
