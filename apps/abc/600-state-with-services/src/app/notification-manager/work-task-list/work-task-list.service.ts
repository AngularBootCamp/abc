import { Injectable } from '@angular/core';
// Behavior Subject is a subclass of Observable
// it is an Observable that allows the creator
// to "push" new values into it
import { BehaviorSubject } from 'rxjs';

import { Task } from '../../types';

@Injectable({
  // This service should be created
  // by the root application injector.
  providedIn: 'root'
})
export class WorkTaskListService {
  // Application State for completed and in-progress tasks
  // State is stored in _done and _todo

  // The behavior subjects allow consumers to be updated
  // when the state changes

  private _done = [
    { label: 'file paperwork' },
    { label: 'send emails' },
    { label: 'work on project A' },
    { label: 'submit report to manager' }
  ];

  done = new BehaviorSubject(this._done);

  private _todo = [
    { label: 'work on project B' },
    { label: 'update task list' }
  ];

  todo = new BehaviorSubject(this._todo);

  setTaskStatus(task: Task, complete: boolean) {
    // Update state by assigning a new array for both _todo and _done, then assign the
    // task to the appropriate list
    this._todo = this._todo.filter(curTask => curTask !== task);
    this._done = this._done.filter(curTask => curTask !== task);

    if (complete) {
      this._todo = [...this._todo, task];
    } else {
      this._done = [...this._done, task];
    }

    // Notify any consumers of the todo list state of changes to both todo lists
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
