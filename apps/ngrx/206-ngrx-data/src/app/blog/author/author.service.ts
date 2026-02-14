import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectCurrentAuthorId } from '../../router.selectors';

import {
  selectCurrentAuthor,
  selectAuthors
} from './author.selectors';

@Injectable({ providedIn: 'root' })
export class AuthorService {
  private store = inject(Store);

  authors = this.store.select(selectAuthors);
  currentAuthorId = this.store.select(selectCurrentAuthorId);
  currentAuthor = this.store.select(selectCurrentAuthor);
}
