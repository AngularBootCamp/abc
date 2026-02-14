import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal
} from '@angular/core';

const meetings = [
  {
    description: 'Standup',
    participants: ['John', 'Paul', 'Ringo', 'George']
  },
  {
    description: 'Meet with the Bills',
    participants: ['Bill', 'Bill', 'Peter']
  },
  { description: 'Working lunch', participants: ['Joe', 'Jane'] }
];

const todoList = [
  { label: 'Attach cover letter to TPS report' },
  { label: 'Double check decimal places' },
  { label: 'Jump to conclusions' }
];

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UserDashboardComponent {
  protected readonly showProfile = signal(true);
  protected readonly nextMeetings = signal(meetings);
  protected readonly todos = signal(todoList);

  protected readonly showHideProfileMessage = computed(
    () => (this.showProfile() ? 'Hide' : 'Show') + ' Profile'
  );

  protected addTodo() {
    this.todos.update(list => [
      { label: `Task ${list.length + 1}` },
      ...list
    ]);
  }
}
