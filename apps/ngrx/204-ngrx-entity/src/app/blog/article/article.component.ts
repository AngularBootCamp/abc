import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { combineLatest, filter, map, Observable, tap } from 'rxjs';

import { DisplayOrEditComponent } from '@class-materials/shared/ui-display-or-edit';

import { articleIdQueryParam } from '../../routing-parameters';
import { ArticleService } from '../article-list/article.service';
import { AuthorService } from '../author/author.service';
import { Article } from '../types';

import { articlePageActions } from './article.actions';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  imports: [AsyncPipe, DisplayOrEditComponent, MatCardModule]
})
export class ArticleComponent {
  private articleService = inject(ArticleService);

  article$: Observable<Article | undefined>;
  title = new FormControl();
  body = new FormControl();

  constructor() {
    const articleService = this.articleService;
    const router = inject(Router);
    const authorService = inject(AuthorService);

    this.article$ = combineLatest([
      articleService.currentArticle,
      authorService.currentAuthorId.pipe(
        filter((authorId): authorId is number => !!authorId)
      )
    ]).pipe(
      tap(([article, authorId]) => {
        if (
          // undefined means no query param, which is valid
          article !== undefined &&
          // null means invalid query param
          // authorIds not matching means inconsistent state
          // in either case, clear the query param
          (article === null || authorId !== article.authorId)
        ) {
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
    this.articleService.dispatch(
      articlePageActions.deleteArticle({ article })
    );
  }

  setTitle(article: Article) {
    this.articleService.dispatch(
      articlePageActions.updateArticle({
        article: {
          ...article,
          title: this.title.value
        }
      })
    );
  }

  setBody(article: Article) {
    this.articleService.dispatch(
      articlePageActions.updateArticle({
        article: {
          ...article,
          body: this.body.value
        }
      })
    );
  }
}
