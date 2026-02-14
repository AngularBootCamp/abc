import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isEqual } from 'lodash-es';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  of,
  shareReplay,
  switchMap
} from 'rxjs';

import { articleIdQueryParam } from '../../routing-parameters';
import { Article } from '../types';

import { ArticleLoaderService } from './article-loader.service';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private articleLoaderSvc = inject(ArticleLoaderService);

  private _articles: BehaviorSubject<Article[]> = new BehaviorSubject<
    Article[]
  >([]);

  readonly articles: Observable<Article[]> =
    this._articles.asObservable();

  readonly selectedArticleId: Observable<number | undefined>;

  readonly selectedArticle: Observable<Article | undefined>;

  constructor() {
    const route = inject(ActivatedRoute);

    this.articleLoaderSvc
      .load()
      .subscribe(articles => this._articles.next(articles));

    this.selectedArticleId = route.queryParamMap.pipe(
      map(params => params.get(articleIdQueryParam)),
      distinctUntilChanged(isEqual),
      map(id => (id ? Number(id) : undefined)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

    this.selectedArticle = this.selectedArticleId.pipe(
      switchMap(articleId =>
        articleId ? this.getArticle(articleId) : of(undefined)
      ),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  getByAuthor(authorId: string | number) {
    return this.articles.pipe(
      map(articles =>
        articles.filter(
          article => article.authorId === Number(authorId)
        )
      )
    );
  }

  getArticle(articleId: string | number) {
    return this.articles.pipe(
      map(articles =>
        articles.find(article => article.id === Number(articleId))
      )
    );
  }

  deleteArticle(article: Article) {
    const articles = this._articles.value.filter(
      p => p.id !== article.id
    );
    this._articles.next(articles);
  }

  createArticle(article: Omit<Article, 'id'>) {
    let articles = this._articles.value;
    const newId =
      Math.max(...this._articles.value.map(p => p.id)) + 1;
    articles = [...articles, { ...article, id: newId }];
    this._articles.next(articles);
  }

  updateArticle(article: Article) {
    let articles = this._articles.value;
    const index = articles.findIndex(p => p.id === article.id);
    if (index >= 0) {
      articles = [
        ...articles.slice(0, index),
        article,
        ...articles.slice(index + 1, articles.length)
      ];
    }
    this._articles.next(articles);
  }
}
