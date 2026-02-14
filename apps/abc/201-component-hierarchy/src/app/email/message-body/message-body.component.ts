import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-message-body',
  templateUrl: './message-body.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageBodyComponent {}
