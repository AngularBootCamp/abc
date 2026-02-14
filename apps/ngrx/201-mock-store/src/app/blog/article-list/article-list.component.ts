import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isEqual } from 'lodash-es';
import {
  distinctUntilChanged,
  firstValueFrom,
  map,
  Observable,
  shareReplay,
  switchMap,
  tap
} from 'rxjs';

import { selectTitle } from '../../reducers';
import { articleIdQueryParam } from '../../routing-parameters';
import { articleListPageActions } from '../article/article.actions';
import { selectArticlesByAuthor } from '../article/article.selectors';
import { extractAuthorId } from '../operators';
import { Article } from '../types';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    AsyncPipe
  ]
})
export class ArticleListComponent {
  private router = inject(Router);
  private store = inject(Store);

  readonly articles: Observable<Article[]>;
  readonly title: Observable<string>;
  readonly selectedArticleId: Observable<number | undefined>;
  readonly authorId: Observable<number>;

  constructor() {
    const route = inject(ActivatedRoute);
    this.title = this.store.select(selectTitle);

    this.authorId = route.paramMap.pipe(extractAuthorId());

    this.articles = this.authorId.pipe(
      switchMap(authorId => this.getArticlesByAuthor(authorId))
    );

    this.selectedArticleId = route.queryParamMap.pipe(
      map(params => params.get(articleIdQueryParam)),
      distinctUntilChanged(isEqual),
      map(articleId => (articleId ? Number(articleId) : undefined)),
      tap(articleId =>
        this.store.dispatch(
          articleListPageActions.chooseArticle({ articleId })
        )
      ),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  getArticlesByAuthor(authorId: number) {
    return this.store.select(selectArticlesByAuthor(authorId));
  }

  selectArticle(articleId: number) {
    const queryParams = { [articleIdQueryParam]: articleId };
    void this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  async createArticle() {
    const uid = await firstValueFrom(this.authorId);

    const newArticle: Omit<Article, 'id'> = {
      body: 'placeholder body',
      title: 'placeholder title',
      authorId: uid || 0
    };
    this.store.dispatch(
      articleListPageActions.createArticle({ article: newArticle })
    );
  }
}
