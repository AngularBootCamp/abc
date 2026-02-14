import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Article } from '../types';

const url = '/api/articles';

@Injectable({ providedIn: 'root' })
export class ArticleLoaderService {
  private http = inject(HttpClient);

  load() {
    return this.http.get<Article[]>(url);
  }

  create(article: Omit<Article, 'id'>) {
    return this.http.post<Article>(url, article);
  }

  delete(article: Article) {
    return this.http.delete(`${url}/${article.id}`);
  }

  update(article: Article) {
    return this.http.put<Article>(`${url}/${article.id}`, article);
  }
}
