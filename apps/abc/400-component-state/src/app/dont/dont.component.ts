import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';

import { Task } from '../types';

import { HomeTaskListComponent } from './home-task-list/home-task-list.component';
import { WorkTaskListComponent } from './work-task-list/work-task-list.component';

/*
  Notice the bloat this top level component has taken on. It needs
  to "own" the data in order to make the appropriate modifications.
  Problems: file size/scope, mixing of concerns, all other problems
  associated with monoliths.
*/

@Component({
  templateUrl: './dont.component.html',
  imports: [WorkTaskListComponent, HomeTaskListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DontComponent {
  doneWork = signal<Task[]>([
    { label: 'file paperwork' },
    { label: 'send emails' },
    { label: 'work on project A' },
    { label: 'submit report to manager' }
  ]);

  todoWork = signal<Task[]>([
    { label: 'work on project B' },
    { label: 'update task list' }
  ]);

  doneHome = signal<Task[]>([
    { label: 'cook dinner' },
    { label: 'go grocery shopping' },
    { label: 'sweep the floors' },
    { label: 'do the laundry' }
  ]);

  todoHome = signal<Task[]>([
    { label: 'fix the leaky faucet' },
    { label: 'mow the lawn' }
  ]);

  // This method is a perfect example of the complexity that's created when
  // all of your state is managed from one location.
  toggleTask(task: Task, complete: boolean, type: string) {
    if (complete && type === 'work') {
      this.doneWork.update(arr =>
        arr.filter(curTask => curTask !== task)
      );
      this.todoWork.update(arr => [...arr, task]);
    } else if (!complete && type === 'work') {
      this.todoWork.update(arr =>
        arr.filter(curTask => curTask !== task)
      );
      this.doneWork.update(arr => [...arr, task]);
    } else if (complete && type === 'home') {
      this.doneHome.update(arr =>
        arr.filter(curTask => curTask !== task)
      );
      this.todoHome.update(arr => [...arr, task]);
    } else if (!complete && type === 'home') {
      this.todoHome.update(arr =>
        arr.filter(curTask => curTask !== task)
      );
      this.doneHome.update(arr => [...arr, task]);
    }
  }

  completeAll() {
    this.doneHome.update(arr => [...arr, ...this.todoHome()]);
    this.doneWork.update(arr => [...arr, ...this.todoWork()]);
    this.todoHome.set([]);
    this.todoWork.set([]);
  }
}
