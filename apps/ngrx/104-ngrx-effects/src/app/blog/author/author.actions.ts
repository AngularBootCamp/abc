import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Author } from '../types';

export const authorInitActions = createActionGroup({
  source: 'Author Init',
  events: {
    'Load Authors': emptyProps()
  }
});

export const authorApiActions = createActionGroup({
  source: 'Author Api',
  events: {
    'Load Authors Success': props<{ authors: Author[] }>(),
    'Load Authors Failure': props<{ error: unknown }>()
  }
});
