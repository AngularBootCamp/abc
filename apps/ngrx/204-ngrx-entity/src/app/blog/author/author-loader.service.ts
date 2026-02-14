import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Author } from '../types';

const url = '/api/authors';

@Injectable({ providedIn: 'root' })
export class AuthorLoaderService {
  private http = inject(HttpClient);

  load() {
    return this.http.get<Author[]>(url);
  }
}
