import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  Params,
  convertToParamMap
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom, of } from 'rxjs';

import { mockArticles } from '../article/mock.articles';

import { ArticleListComponent } from './article-list.component';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let params: Params;
  let queryParams: Params;

  beforeEach(() => {
    params = {
      authorId: '2'
    };
    queryParams = {
      articleId: '2'
    };

    TestBed.configureTestingModule({
      providers: [
        ArticleListComponent,
        provideMockStore({
          initialState: {
            article: {
              articles: mockArticles
            },
            config: {
              title: 'Blog Title'
            }
          }
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap(params)),
            queryParamMap: of(convertToParamMap(queryParams))
          }
        }
      ],
      imports: [RouterTestingModule]
    });

    component = TestBed.inject(ArticleListComponent);
  });

  describe('getArticlesByAuthor', () => {
    it('should return the articles', async () => {
      const result = await firstValueFrom(
        component.getArticlesByAuthor(1)
      );

      expect(result).toEqual([mockArticles[0], mockArticles[1]]);
    });
  });

  describe('title', () => {
    it('should get the title', async () => {
      const result = await firstValueFrom(component.title);

      expect(result).toEqual('Blog Title');
    });
  });

  describe('authorId', () => {
    it('should get the authorId on a matching authorId', async () => {
      const result = await firstValueFrom(component.authorId);

      expect(result).toEqual(2);
    });
  });

  describe('articles', () => {
    it('should get the articles on a matching authorId', async () => {
      const result = await firstValueFrom(component.articles);

      expect(result).toEqual([mockArticles[2]]);
    });

    it('should get the articles on a non-matching authorId', async () => {
      params['authorId'] = '999';

      const result = await firstValueFrom(component.articles);

      expect(result).toEqual([]);
    });
  });

  // removed the test for selectedArticleId - the only functionality left
  // was using a router selector, and that would need to be mocked
  // out, leaving nothing of consequence in the test.
});
