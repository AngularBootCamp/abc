import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';

import { ArticleComponent } from '../article/article.component';
import { selectArticles } from '../article/article.selectors';
import { ArticleListComponent } from '../article-list/article-list.component';
import { extractAuthorId } from '../operators';
import { Article, Author } from '../types';

import { AuthorService } from './author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ArticleListComponent,
    ArticleComponent,
    AsyncPipe
  ]
})
export class AuthorComponent {
  author$: Observable<Author | undefined>;
  articles$: Observable<Article[] | undefined>;

  constructor() {
    const store = inject(Store);
    const authorService = inject(AuthorService);
    const route = inject(ActivatedRoute);

    this.author$ = route.paramMap.pipe(
      extractAuthorId(),
      switchMap(id => authorService.getAuthor(id))
    );

    this.articles$ = store.select(selectArticles);
  }
}
