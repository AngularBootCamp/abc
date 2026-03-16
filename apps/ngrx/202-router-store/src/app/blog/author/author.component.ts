import { Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Observable, switchMap } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Store } from '@ngrx/store';

import { ArticleListComponent } from '../article-list/article-list.component';
import { ArticleComponent } from '../article/article.component';
import { selectArticles } from '../article/article.selectors';
import { extractAuthorId } from '../operators';
import { Article, Author } from '../types';

import { selectAuthor } from './author.selectors';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ArticleListComponent,
    ArticleComponent,
    AsyncPipe,
  ],
})
export class AuthorComponent {
  author$: Observable<Author | undefined>;
  articles$: Observable<Article[] | undefined>;

  constructor() {
    const store = inject(Store);
    const route = inject(ActivatedRoute);

    this.author$ = route.paramMap.pipe(
      extractAuthorId(),
      switchMap(id => store.select(selectAuthor(id))),
    );

    this.articles$ = store.select(selectArticles);
  }
}
