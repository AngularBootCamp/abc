import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  protected readonly employee = signal('John Doe');
  protected readonly daysWorked = signal(81);
  protected readonly company = signal({ name: 'Acme, Inc.' });
  protected readonly employeeOfTheWeek = signal({
    name: 'Jane Smith',
    picture: 'assets/avatar.png'
  });
}
