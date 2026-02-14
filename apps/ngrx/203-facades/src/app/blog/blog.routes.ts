import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { authorIdRouteParam } from '../routing-parameters';

import { ArticleEffects } from './article/article.effects';
import * as fromArticle from './article/article.reducer';
import { AuthorComponent } from './author/author.component';
import { AuthorEffects } from './author/author.effects';
import * as fromAuthor from './author/author.reducer';
import { AuthorListComponent } from './author-list/author-list.component';

const blogRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState(fromArticle.articleFeature),
      provideState(fromAuthor.authorFeature),
      provideEffects(ArticleEffects, AuthorEffects)
    ],
    children: [
      {
        path: '',
        component: AuthorListComponent
      },
      {
        path: `:${authorIdRouteParam}`,
        component: AuthorComponent
      }
    ]
  }
];

export default blogRoutes;
