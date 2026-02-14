import { AsyncPipe } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, firstValueFrom } from 'rxjs';

import { ConfigStore } from '../../config.store';
import { selectCurrentArticleId } from '../../router.selectors';
import { articleIdQueryParam } from '../../routing-parameters';
import { ArticleStore } from '../article/article.store';
import { AuthorService } from '../author/author.service';
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

  private readonly articleStore = inject(ArticleStore);
  readonly title = inject(ConfigStore).title;
  readonly authorId = inject(AuthorService).currentAuthorId.pipe(
    filter((authorId): authorId is number => !!authorId)
  );

  readonly selectedArticleId = inject(Store).select(
    selectCurrentArticleId
  );

  readonly articles: Signal<Article[]>;

  constructor() {
    const authorId = toSignal(this.authorId);

    this.articles = computed(() => {
      return this.articleStore
        .entities()
        .filter(article => article.authorId === Number(authorId()));
    });
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
    this.articleStore.createArticle(newArticle);
  }
}
