import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-message-header',
  templateUrl: './message-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageHeaderComponent {}
