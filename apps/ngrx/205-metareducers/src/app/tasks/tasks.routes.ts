import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { DoneTasksComponent } from './done-tasks/done-tasks.component';
import { TasksDashboardComponent } from './tasks-dashboard/tasks-dashboard.component';
import { TasksEffects } from './tasks.effects';
import * as fromTasks from './tasks.reducer';
import { TodoTasksComponent } from './todo-tasks/todo-tasks.component';

const tasksRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState(fromTasks.tasksFeature),
      provideEffects(TasksEffects)
    ],
    component: TasksDashboardComponent,
    children: [
      { path: '', redirectTo: 'done', pathMatch: 'prefix' },
      { path: 'done', component: DoneTasksComponent },
      { path: 'todo', component: TodoTasksComponent }
    ]
  }
];

export default tasksRoutes;
