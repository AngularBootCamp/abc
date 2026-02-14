import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { provideState, Store } from '@ngrx/store';

import { authorIdRouteParam } from '../routing-parameters';

import { articleActions } from './article/article.actions';
import * as fromArticle from './article/article.reducer';
import { ArticleLoaderService } from './article-list/article-loader.service';
import { AuthorComponent } from './author/author.component';
import { AuthorListComponent } from './author-list/author-list.component';
// import { ArticleEffects } from './article/article.effects';

const blogRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState(fromArticle.articleFeature)
      // provideEffects(ArticleEffects)
    ],
    resolve: {
      articles: () => {
        // TODO: this is not the standard way to do this; we'll see a
        //  better way with Effects. One problem is that there's no
        //  way to unsubscribe from this manual subscription because
        //  there are no lifecycle hooks here.
        const articleLoaderService = inject(ArticleLoaderService);
        const store = inject(Store);
        articleLoaderService.load().subscribe(articles =>
          store.dispatch(
            articleActions.loadArticlesSuccess({
              articles
            })
          )
        );
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
