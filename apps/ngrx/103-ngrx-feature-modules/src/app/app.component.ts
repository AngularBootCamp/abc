import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { DisplayOrEditComponent } from '@class-materials/shared/ui-display-or-edit';
import { HeaderComponent } from '@class-materials/shared/ui-page-header';

import { configActions, selectTitle } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    DisplayOrEditComponent,
    HeaderComponent,
    MatButtonModule,
    MatToolbarModule,
    RouterLink,
    RouterOutlet
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  private store = inject(Store);

  title = new FormControl();
  destroy = new Subject();

  ngOnInit() {
    this.store
      // This line was the solution for workshop 101, before we learned
      // about memoized selectors in 102.
      // .select(state => state.title),
      .select(selectTitle)
      .pipe(takeUntil(this.destroy))
      .subscribe(titleValue => this.title.setValue(titleValue));
  }

  setTitle() {
    this.store.dispatch(
      configActions.updateTitle({ title: this.title.value })
    );
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
