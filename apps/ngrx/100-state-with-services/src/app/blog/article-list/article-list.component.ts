import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, switchMap } from 'rxjs';

import { ConfigService } from '../../config.service';
import { articleIdQueryParam } from '../../routing-parameters';
import { extractAuthorId } from '../operators';
import { Article } from '../types';

import { ArticleService } from './article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    AsyncPipe
  ]
})
export class ArticleListComponent {
  private articleService = inject(ArticleService);
  private router = inject(Router);

  readonly title = inject(ConfigService).title;

  readonly authorId =
    inject(ActivatedRoute).paramMap.pipe(extractAuthorId());

  readonly articles = this.authorId.pipe(
    switchMap(authorId => this.getArticlesByAuthor(authorId))
  );

  readonly selectedArticleId = this.articleService.selectedArticleId;

  getArticlesByAuthor(authorId: number) {
    return this.articleService.getByAuthor(authorId);
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
    this.articleService.createArticle(newArticle);
  }
}
