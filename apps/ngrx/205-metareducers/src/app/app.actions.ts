import { createActionGroup, emptyProps } from '@ngrx/store';

export const appActions = createActionGroup({
  source: 'App',
  events: {
    'Clear State': emptyProps()
  }
});

export const appApiActions = createActionGroup({
  source: 'App Api',
  events: {
    'Clear State Success': emptyProps()
  }
});
