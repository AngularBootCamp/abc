import { ChangeDetectionStrategy, Component } from '@angular/core';

import { scheduleMap } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  name = 'John Doe';
  message = 'Please Clock In';
  currentSchedule = 'Hover to see selected work times';

  clockIn(event: MouseEvent) {
    if (event.shiftKey) {
      this.message = 'Clocked in as manager!';
    } else {
      this.message = 'Clocked in as employee';
    }
  }

  clockOut() {
    this.message = 'Have a nice day!';
  }

  showSchedule(day: string) {
    this.currentSchedule = scheduleMap[day];
  }

  clearSchedule() {
    this.currentSchedule = 'Hover to see selected work times';
  }
}
