import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  RouterLinkActive,
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { Store } from '@ngrx/store';

import { HeaderComponent } from '@class-materials/shared/ui-page-header';

import { appActions } from './app.actions';
import { undoRedoActions } from './undo-redo/undo-redo.actions';
import {
  selectRedoAvailable,
  selectUndoAvailable
} from './undo-redo/undo-redo.selectors';
import { selectUserName } from './user-profile/user-profile.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    AsyncPipe,
    HeaderComponent,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ]
})
export class AppComponent {
  private store = inject(Store);

  userName = this.store.select(selectUserName);
  undoItem = this.store.select(selectUndoAvailable);
  redoItem = this.store.select(selectRedoAvailable);

  clear() {
    this.store.dispatch(appActions.clearState());
  }

  undo() {
    this.store.dispatch(undoRedoActions.undoAction());
  }

  redo() {
    this.store.dispatch(undoRedoActions.redoAction());
  }
}
