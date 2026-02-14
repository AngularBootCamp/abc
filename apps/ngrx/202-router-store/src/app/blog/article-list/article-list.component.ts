import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, switchMap } from 'rxjs';

import { selectTitle } from '../../reducers';
import { selectCurrentArticleId } from '../../router.selectors';
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

  readonly title = this.store.select(selectTitle);
  readonly authorId =
    inject(ActivatedRoute).paramMap.pipe(extractAuthorId());
  readonly articles = this.authorId.pipe(
    switchMap(authorId => this.getArticlesByAuthor(authorId))
  );
  readonly selectedArticleId = this.store.select(
    selectCurrentArticleId
  );

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
