import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';

import { map } from 'rxjs';

import { Store } from '@ngrx/store';

import { CounterDisplayComponent } from './counter-display.component';
import { AppState, emptyCart, pickApples, pickBerry } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CounterDisplayComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // We will learn a better way (that doesn't violate linting) in the
  // next step.

  /* eslint-disable-next-line @ngrx/no-typed-global-store */
  private readonly store = inject(Store<AppState>);

  /* eslint-disable @ngrx/prefer-selector-in-select */

  protected readonly berry = this.store.select(
    myAppState => myAppState.berryCounter,
  );

  protected readonly apple = this.store.select(
    state => state.appleCounter,
  );

  /* eslint-enable @ngrx/prefer-selector-in-select */

  // Internally, store.select uses RxJS that looks like this:
  protected readonly total = this.store.pipe(
    map(s => s.berryCounter + s.appleCounter),
  );

  protected pickBerry() {
    this.store.dispatch(pickBerry());
  }

  protected pickApple(count: number) {
    this.store.dispatch(pickApples({ count }));
  }

  protected empty() {
    this.store.dispatch(emptyCart());
  }
}
