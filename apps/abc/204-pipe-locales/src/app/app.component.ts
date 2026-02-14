import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';

import { upcomingSessions } from './sessions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CurrencyPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  protected readonly sessions = signal(upcomingSessions);
}
