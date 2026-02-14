import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState
} from '@ngrx/signals';

import { Task } from './types';

export interface HomeTaskState {
  todoHome: Task[];
  doneHome: Task[];
}

export const HomeTaskStore = signalStore(
  { providedIn: 'root', protectedState: false },
  withState<HomeTaskState>({ todoHome: [], doneHome: [] }),
  withMethods(state => ({
    setHomeState(task: Task, complete: boolean) {
      patchState(
        state,
        setHomeTaskStatus(
          state.todoHome(),
          state.doneHome(),
          task,
          complete
        )
      );
    },
    completeAll() {
      patchState(state, {
        doneHome: [...state.doneHome(), ...state.todoHome()],
        todoHome: []
      });
    },
    homeTasksReceived(tasks: HomeTaskState) {
      patchState(state, tasks);
    }
  })),
  withHooks({
    onInit({ homeTasksReceived }) {
      homeTasksReceived({
        doneHome: [
          { label: 'cook dinner' },
          { label: 'go grocery shopping' },
          { label: 'sweep the floors' },
          { label: 'do the laundry' }
        ],
        todoHome: [
          { label: 'fix the leaky faucet' },
          { label: 'mow the lawn' }
        ]
      });
    }
  })
);

// Necessary to inject HomeTaskStore as a type
export type HomeTaskStore = InstanceType<typeof HomeTaskStore>;

function setHomeTaskStatus(
  oldTodoHome: Task[],
  oldDoneHome: Task[],
  task: Task,
  complete: boolean
): HomeTaskState {
  const todoHome = oldTodoHome.filter(x => x !== task);
  const doneHome = oldDoneHome.filter(x => x !== task);
  if (complete) {
    todoHome.push(task);
  } else {
    doneHome.push(task);
  }
  return { todoHome, doneHome };
}
