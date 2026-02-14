import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Article } from '../types';

export const articleActions = createActionGroup({
  source: 'Article',
  events: {
    'Load Articles': emptyProps(),
    'Load Articles Success': props<{ articles: Article[] }>(),
    'Load Articles Failure': props<{ error: unknown }>(),
    'Create Article': props<{ article: Omit<Article, 'id'> }>(),
    'Delete Article': props<{ article: Article }>(),
    'Update Article': props<{ article: Article }>(),
    'Choose Article': props<{ articleId: number | undefined }>()
  }
});
