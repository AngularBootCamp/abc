import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Author } from '../types';

const url = '/api/authors';

@Injectable({ providedIn: 'root' })
export class AuthorLoaderService {
  private readonly http = inject(HttpClient);

  load() {
    return this.http.get<Author[]>(url);
  }
}
