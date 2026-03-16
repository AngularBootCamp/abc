import { Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { filter } from 'rxjs';

import { MatListModule } from '@angular/material/list';

import { Store } from '@ngrx/store';

import { selectAuthors } from '../author/author.selectors';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
  imports: [MatListModule, RouterLink, AsyncPipe],
})
export class AuthorListComponent {
  readonly authors$ = inject(Store)
    .select(selectAuthors)
    .pipe(filter(authors => !!authors.length));
}
