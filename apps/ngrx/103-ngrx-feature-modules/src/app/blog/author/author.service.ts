import { Injectable, inject } from '@angular/core';
import { map, shareReplay } from 'rxjs';

import { AuthorLoaderService } from './author-loader.service';

@Injectable({ providedIn: 'root' })
export class AuthorService {
  private authorLoaderService = inject(AuthorLoaderService);

  readonly authors = this.authorLoaderService
    .load()
    .pipe(shareReplay(1));

  getAuthor(id: string | number) {
    return this.authors.pipe(
      map(authors => authors.find(author => author.id === +id))
    );
  }
}
