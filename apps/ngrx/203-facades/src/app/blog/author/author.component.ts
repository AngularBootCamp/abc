import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';

import { ArticleComponent } from '../article/article.component';
import { ArticleListComponent } from '../article-list/article-list.component';
import { ArticleService } from '../article-list/article.service';

import { selectCurrentAuthor } from './author.selectors';

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
    AsyncPipe
  ]
})
export class AuthorComponent {
  author$ = inject(Store).select(selectCurrentAuthor);
  articles$ = inject(ArticleService).articles;
}
