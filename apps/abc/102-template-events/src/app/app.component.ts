import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';

const schedule: Record<string, string> = {
  M: '9:00 - 5:00',
  T: '9:00 - 4:30',
  W: '9:00 - 3:00',
  R: '9:00 - 3:30',
  F: '9:00 - 5:00'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  protected readonly name = signal('John Doe');
  protected readonly message = signal('Please Clock In');
  protected readonly currentSchedule = signal(
    'Hover to see selected work times'
  );

  protected clockIn(ev: PointerEvent) {
    this.message.set(
      'Clocked in as ' + (ev.shiftKey ? 'manager' : 'employee')
    );
  }

  protected clockOut() {
    this.message.set('Have a nice day!');
  }

  protected showSchedule(day: string) {
    this.currentSchedule.set(schedule[day]);
  }

  protected clearSchedule() {
    this.currentSchedule.set('Hover to see selected work times');
  }
}
