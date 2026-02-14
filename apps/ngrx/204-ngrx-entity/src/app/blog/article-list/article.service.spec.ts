import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { keyBy } from 'lodash-es';
import { firstValueFrom } from 'rxjs';

import { mockArticles } from '../article/mock.articles';

import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let articleSvc: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            article: {
              ids: mockArticles.map(article => article.id),
              entities: keyBy(mockArticles, 'id')
            }
          }
        })
      ]
    });

    articleSvc = TestBed.inject(ArticleService);
  });

  describe('getArticlesByAuthor', () => {
    it('should return the articles', async () => {
      const result = await firstValueFrom(
        articleSvc.getArticlesByAuthor(1)
      );

      expect(result).toEqual([mockArticles[0], mockArticles[1]]);
    });
  });
});
