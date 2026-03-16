import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';

import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly visitCount = inject(SocketService).message;
}
