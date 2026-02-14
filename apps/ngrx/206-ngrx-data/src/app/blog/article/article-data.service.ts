import { Injectable, inject } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { Article } from '../types';

@Injectable({ providedIn: 'root' })
export class ArticleDataService extends EntityCollectionServiceBase<Article> {
  constructor() {
    const serviceElementsFactory = inject(
      EntityCollectionServiceElementsFactory
    );

    super('Article', serviceElementsFactory);
    // initialize the data
    this.load();
  }
}
