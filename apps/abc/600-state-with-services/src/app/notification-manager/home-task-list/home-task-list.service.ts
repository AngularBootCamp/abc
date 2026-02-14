import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Task } from '../../types';

// See work-task-list.service.ts for details on what these services do.

@Injectable({
  providedIn: 'root'
})
export class HomeTaskListService {
  private _done = [
    { label: 'Cook dinner' },
    { label: 'Go grocery shopping' },
    { label: 'Sweep the floors' },
    { label: 'Do the laundry' }
  ];

  private _todo = [
    { label: 'Fix the leaky faucet' },
    { label: 'Mow the lawn' }
  ];

  public readonly done = new BehaviorSubject(this._done);
  public readonly todo = new BehaviorSubject(this._todo);

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
