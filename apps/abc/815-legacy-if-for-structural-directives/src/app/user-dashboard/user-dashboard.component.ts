/* eslint-disable @typescript-eslint/no-deprecated, @typescript-eslint/no-restricted-imports
-- This is an example of legacy code
*/
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';

const meetings = [
  {
    description: 'Standup',
    participants: ['John', 'Paul', 'Ringo', 'George'],
  },
  {
    description: 'Meet with the Bills',
    participants: ['Bill', 'Bill', 'Peter'],
  },
  { description: 'Working lunch', participants: ['Joe', 'Jane'] },
];

const todoList = [
  'Attach cover letter to TPS report',
  'Double check decimal places',
  'Jump to conclusions',
];

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  imports: [NgIf, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserDashboardComponent {
  protected showProfile = true;
  protected nextMeetings = meetings;
  protected todos = todoList;

  protected addTodo() {
    this.todos.push(`Task ${this.todos.length + 1}`);
  }
}
