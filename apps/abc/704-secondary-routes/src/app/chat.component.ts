import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  template: `<header>This is chat</header>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {}
