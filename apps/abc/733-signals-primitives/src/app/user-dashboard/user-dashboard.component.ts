import { Component, computed, signal } from '@angular/core';

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
  templateUrl: './user-dashboard.component.html'
})
export default class UserDashboardComponent {
  showProfile = signal(true);
  nextMeetings = meetings;
  todos = signal(todoList);
  showHideProfileMessage = computed(
    () => `${this.showProfile() ? 'Hide' : 'Show'} Profile`
  );

  addTodo() {
    // set is the basic
    this.todos.set([
      { label: `Task ${this.todos().length + 1}` },
      ...this.todos()
    ]);

    // update is somewhat more advanced
    // this.todos.update(value => [
    //   { label: `Task ${value.length + 1}` },
    //   ...value
    // ]);
  }
}
