import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, tap } from 'rxjs';

import { DisplayOrEditComponent } from '@class-materials/shared/ui-display-or-edit';

import { articleIdQueryParam } from '../../routing-parameters';
import { extractAuthorId } from '../operators';
import { Article } from '../types';

import { articlePageActions } from './article.actions';
import { selectCurrentArticle } from './article.selectors';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  imports: [AsyncPipe, DisplayOrEditComponent, MatCardModule]
})
export class ArticleComponent {
  private store = inject(Store);

  article$: Observable<Article | undefined>;
  title = new FormControl();
  body = new FormControl();

  constructor() {
    const router = inject(Router);
    const route = inject(ActivatedRoute);

    const authorId$ = route.paramMap.pipe(extractAuthorId());

    this.article$ = combineLatest([
      this.store.select(selectCurrentArticle),
      authorId$
    ]).pipe(
      tap(([article, authorId]) => {
        if (!article || authorId !== article.authorId) {
          void router.navigate([], {
            queryParams: { [articleIdQueryParam]: undefined },
            queryParamsHandling: 'merge'
          });
        }
      }),
      map(([article, authorId]) =>
        // discard the article if the article is from the wrong author
        authorId === article?.authorId ? article : undefined
      ),
      tap(article => {
        if (article) {
          this.title.setValue(article.title);
          this.body.setValue(article.body);
        }
      })
    );
  }

  delete(article: Article) {
    this.store.dispatch(
      articlePageActions.deleteArticle({ article })
    );
  }

  setTitle(article: Article) {
    this.store.dispatch(
      articlePageActions.updateArticle({
        article: {
          ...article,
          title: this.title.value
        }
      })
    );
  }

  setBody(article: Article) {
    this.store.dispatch(
      articlePageActions.updateArticle({
        article: {
          ...article,
          body: this.body.value
        }
      })
    );
  }
}
