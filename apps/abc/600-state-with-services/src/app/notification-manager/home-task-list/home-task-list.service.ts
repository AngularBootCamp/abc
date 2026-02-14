import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Task } from '../../types';

// See work-task-list.service.ts for
// a rundown of what these services do.

@Injectable({
  providedIn: 'root'
})
export class HomeTaskListService {
  private _done = [
    { label: 'cook dinner' },
    { label: 'go grocery shopping' },
    { label: 'sweep the floors' },
    { label: 'do the laundry' }
  ];
  done = new BehaviorSubject(this._done);

  private _todo = [
    { label: 'fix the leaky faucet' },
    { label: 'mow the lawn' }
  ];
  todo = new BehaviorSubject(this._todo);

  setTaskStatus(task: Task, complete: boolean) {
    this._todo = this._todo.filter(curTask => curTask !== task);
    this._done = this._done.filter(curTask => curTask !== task);
    if (complete) {
      this._todo = [...this._todo, task];
    } else {
      this._done = [...this._done, task];
    }
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
