import { Injectable, inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';

import { selectCurrentArticleId } from '../../router.selectors';
import {
  selectCurrentArticle,
  selectArticles,
  selectArticlesByAuthor
} from '../article/article.selectors';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private store = inject(Store);

  articles = this.store.select(selectArticles);
  currentArticle = this.store.select(selectCurrentArticle);
  currentArticleId = this.store.select(selectCurrentArticleId);

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  getArticlesByAuthor(authorId: number) {
    return this.store.select(selectArticlesByAuthor(authorId));
  }
}
