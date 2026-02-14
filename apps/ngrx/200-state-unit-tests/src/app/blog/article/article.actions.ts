import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Article } from '../types';

export const articleInitActions = createActionGroup({
  source: 'Article Init',
  events: {
    'Load Articles': emptyProps()
  }
});

export const articlePageActions = createActionGroup({
  source: 'Article Page',
  events: {
    'Delete Article': props<{ article: Article }>(),
    'Update Article': props<{ article: Article }>()
  }
});

export const articleListPageActions = createActionGroup({
  source: 'Article List Page',
  events: {
    'Create Article': props<{ article: Omit<Article, 'id'> }>(),
    'Choose Article': props<{ articleId: number | undefined }>()
  }
});

export const articleApiActions = createActionGroup({
  source: 'Article Api',
  events: {
    'Load Articles Success': props<{ articles: Article[] }>(),
    'Load Articles Failure': props<{ error: unknown }>(),
    'Create Article Success': props<{ article: Article }>(),
    'Create Article Failure': props<{ error: unknown }>(),
    'Delete Article Success': props<{ articleId: number }>(),
    'Delete Article Failure': props<{ error: unknown }>(),
    'Update Article Success': props<{ article: Article }>(),
    'Update Article Failure': props<{ error: unknown }>()
  }
});
