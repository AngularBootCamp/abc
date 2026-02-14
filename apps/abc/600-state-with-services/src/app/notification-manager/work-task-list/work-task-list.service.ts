import { Injectable } from '@angular/core';
// Behavior Subject is a subclass of Observable that
// allows the creator to "push" new values into it.
import { BehaviorSubject } from 'rxjs';

import { Task } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class WorkTaskListService {
  // Application state is stored in private properties.

  private _done = [
    { label: 'File paperwork' },
    { label: 'Send emails' },
    { label: 'Work on project A' },
    { label: 'Submit report to manager' }
  ];

  private _todo = [
    { label: 'Work on project B' },
    { label: 'Update task list' }
  ];

  // The behavior subjects are used to notify subscribers when the
  // application state changes.

  public readonly done = new BehaviorSubject(this._done);
  public readonly todo = new BehaviorSubject(this._todo);

  setTaskStatus(task: Task, complete: boolean) {
    // Update state by assigning a new array for both _todo and _done,
    // then assign the task to the appropriate list.
    this._todo = this._todo.filter(curTask => curTask !== task);
    this._done = this._done.filter(curTask => curTask !== task);

    if (complete) {
      this._todo = [...this._todo, task];
    } else {
      this._done = [...this._done, task];
    }

    // Notify any consumers of changes to both todo lists.
    this.done.next(this._done);
    this.todo.next(this._todo);
  }

  completeAll() {
    this._done = [...this._done, ...this._todo];
    this._todo = [];
    this.todo.next(this._todo);
    this.done.next(this._done);
  }
}
