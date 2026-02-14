import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ArticleComponent } from '../article/article.component';
import { ArticleListComponent } from '../article-list/article-list.component';
import { ArticleService } from '../article-list/article.service';

import { AuthorService } from './author.service';

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
  author$ = inject(AuthorService).currentAuthor;
  articles$ = inject(ArticleService).articles;
}
