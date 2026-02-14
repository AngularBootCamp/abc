import { Injectable, inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';

import { selectTitle } from './reducers';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private store = inject(Store);

  title = this.store.select(selectTitle);

  /**
   * A general dispatching function. It's tempting to have a
   * specific method to dispatch each action type, but an important
   * part of NgRx action hygiene is to have actions be as specific as
   * possible, and wrapping a dispatch in a method means losing the
   * context of the caller. The NgRx team strongly recommends this
   * approach.
   *
   * See https://www.youtube.com/watch?v=OZam9fNNwSE
   */
  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
