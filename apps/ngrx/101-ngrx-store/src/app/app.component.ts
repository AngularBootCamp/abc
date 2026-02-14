import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { HeaderComponent } from '@class-materials/shared/ui-page-header';

import { CounterDisplayComponent } from './counter-display.component';
import { AppState, emptyCart, pickApples, pickBerry } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    AsyncPipe,
    CounterDisplayComponent,
    HeaderComponent,
    MatButtonModule
  ]
})
export class AppComponent {
  // We will learn a better way (that doesn't violate linting) in the
  // next step.
  // eslint-disable-next-line @ngrx/no-typed-global-store
  private store = inject<Store<AppState>>(Store);

  // eslint-disable-next-line @ngrx/prefer-selector-in-select
  berry = this.store.select(myAppState => myAppState.berryCounter);

  // eslint-disable-next-line @ngrx/prefer-selector-in-select
  apple = this.store.select(state => state.appleCounter);

  // Internally, store.select uses RxJS that looks like this:
  total = this.store.pipe(map(s => s.berryCounter + s.appleCounter));

  pickBerry() {
    this.store.dispatch(pickBerry());
  }

  pickApple(count: number) {
    this.store.dispatch(pickApples({ count }));
  }

  empty() {
    this.store.dispatch(emptyCart());
  }
}
