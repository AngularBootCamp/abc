import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, Store } from '@ngrx/store';

import { authorIdRouteParam } from '../routing-parameters';

import { ArticleEffects } from './article/article.effects';
import * as fromArticle from './article/article.reducer';
import { AuthorLoaderService } from './author/author-loader.service';
import { authorApiActions } from './author/author.actions';
import { AuthorComponent } from './author/author.component';
// import { AuthorEffects } from './author/author.effects';
import * as fromAuthor from './author/author.reducer';
import { AuthorListComponent } from './author-list/author-list.component';

const blogRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState(fromArticle.articleFeature),
      provideState(fromAuthor.authorFeature),
      provideEffects(ArticleEffects /*, AuthorEffects*/)
    ],
    resolve: {
      articles: () => {
        // TODO: this is not the standard way to do this; we'll see a
        //  better way with Effects. One problem is that there's no
        //  way to unsubscribe from this manual subscription because
        //  there are no lifecycle hooks here.
        const authorLoaderService = inject(AuthorLoaderService);
        const store = inject(Store);
        authorLoaderService.load().subscribe(authors => {
          store.dispatch(
            authorApiActions.loadAuthorsSuccess({ authors })
          );
        });
      }
    },
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
