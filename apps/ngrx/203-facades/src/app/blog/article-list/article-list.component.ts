import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, firstValueFrom, switchMap } from 'rxjs';

import { ConfigService } from '../../config.service';
import {
  selectCurrentArticleId,
  selectCurrentAuthorId
} from '../../router.selectors';
import { articleIdQueryParam } from '../../routing-parameters';
import { articleListPageActions } from '../article/article.actions';
import { Article } from '../types';

import { ArticleService } from './article.service';

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
  private articleService = inject(ArticleService);

  readonly authorId = inject(Store)
    .select(selectCurrentAuthorId)
    .pipe(filter((authorId): authorId is number => !!authorId));

  readonly articles = this.authorId.pipe(
    switchMap(authorId => this.getArticlesByAuthor(authorId))
  );

  readonly title = inject(ConfigService).title;
  readonly selectedArticleId = inject(Store).select(
    selectCurrentArticleId
  );

  getArticlesByAuthor(authorId: number) {
    return this.articleService.getArticlesByAuthor(authorId);
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
    this.articleService.dispatch(
      articleListPageActions.createArticle({ article: newArticle })
    );
  }
}
