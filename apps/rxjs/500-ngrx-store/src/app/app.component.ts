import { Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';

import { map } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Store } from '@ngrx/store';

import { HeaderComponent } from '@class-materials/shared/ui-page-header';

import { CounterDisplayComponent } from './counter-display.component';
import { AppState, emptyCart, pickApples, pickBerry } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    AsyncPipe,
    HeaderComponent,
    CounterDisplayComponent,
    MatButtonModule,
    MatCardModule,
  ],
})
export class AppComponent {
  // We will learn a better way (that doesn't violate linting) in the
  // next step.

  /* eslint-disable-next-line @ngrx/no-typed-global-store */
  private store = inject(Store<AppState>);

  /* eslint-disable @ngrx/prefer-selector-in-select */

  readonly berry = this.store.select(
    myAppState => myAppState.berryCounter,
  );

  readonly apple = this.store.select(state => state.appleCounter);

  /* eslint-enable @ngrx/prefer-selector-in-select */

  // Internally, store.select uses RxJS that looks like this:
  readonly total = this.store.pipe(
    map(s => s.berryCounter + s.appleCounter),
  );

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
