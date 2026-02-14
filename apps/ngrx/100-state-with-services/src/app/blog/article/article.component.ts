import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable, tap } from 'rxjs';

import { DisplayOrEditComponent } from '@class-materials/shared/ui-display-or-edit';

import { articleIdQueryParam } from '../../routing-parameters';
import { ArticleService } from '../article-list/article.service';
import { extractAuthorId } from '../operators';
import { Article } from '../types';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  imports: [AsyncPipe, DisplayOrEditComponent, MatCardModule]
})
export class ArticleComponent {
  private articleService = inject(ArticleService);

  article$: Observable<Article | undefined>;
  title = new FormControl();
  body = new FormControl();

  constructor() {
    const route = inject(ActivatedRoute);
    const router = inject(Router);

    const authorId$ = route.paramMap.pipe(extractAuthorId());

    this.article$ = combineLatest([
      this.articleService.selectedArticle,
      authorId$
    ]).pipe(
      tap(([article, authorId]) => {
        if (!article || authorId !== article.authorId) {
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
    // Typically you wouldn't use native browser prompts.
    if (
      window.confirm('Are you sure you want to delete this article?')
    ) {
      this.articleService.deleteArticle(article);
    }
  }

  setTitle(article: Article) {
    this.articleService.updateArticle({
      ...article,
      title: this.title.value
    });
  }

  setBody(article: Article) {
    this.articleService.updateArticle({
      ...article,
      body: this.body.value
    });
  }
}
