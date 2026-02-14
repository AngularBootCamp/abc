import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';

import { selectCurrentArticleId } from '../../router.selectors';
import { ArticleDataService } from '../article/article-data.service';
import { Article } from '../types';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private store = inject(Store);
  private articleDataService = inject(ArticleDataService);

  articles = this.articleDataService.entities$;
  currentArticleId = this.store.select(selectCurrentArticleId);
  // One downside of Data - we lose the selector memoization
  currentArticle = combineLatest([
    this.articleDataService.entityMap$,
    this.currentArticleId
  ]).pipe(
    map(([articles, articleId]) =>
      articleId ? (articles[articleId] ?? null) : undefined
    )
  );

  getArticlesByAuthor(authorId: number) {
    return this.articles.pipe(
      map(articles =>
        articles.filter(
          article => article.authorId === Number(authorId)
        )
      )
    );
  }

  createArticle(article: Omit<Article, 'id'>) {
    // it's ok to exclude the id with a pessimistic save
    this.articleDataService.add(article as Article, {
      isOptimistic: false
    });
  }

  deleteArticle(article: Article) {
    this.articleDataService.delete(article);
  }

  updateArticle(article: Article) {
    this.articleDataService.update(article, { isOptimistic: false });
  }
}
