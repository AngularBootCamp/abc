import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  Params,
  Router
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom, of } from 'rxjs';

import { AppState } from '../../reducers';
import { Article } from '../types';

import { ArticleComponent } from './article.component';
import { selectCurrentArticle } from './article.selectors';
import { mockArticles } from './mock.articles';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let params: Params;
  let router: Router;
  let mockStore: MockStore;
  let selectCurrentArticleMock: MemoizedSelector<
    AppState,
    Article | undefined | null
  >;

  beforeEach(() => {
    params = {
      authorId: '1'
    };

    TestBed.configureTestingModule({
      providers: [
        ArticleComponent,
        provideMockStore({
          initialState: {
            article: {
              articles: mockArticles
            }
          }
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap(params))
          }
        }
      ],
      imports: [RouterTestingModule]
    });

    component = TestBed.inject(ArticleComponent);
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
    mockStore = TestBed.inject(MockStore);
    selectCurrentArticleMock = mockStore.overrideSelector(
      selectCurrentArticle,
      mockArticles[1]
    );
  });

  describe('article$', () => {
    it('should handle undefined article (no query param)', async () => {
      selectCurrentArticleMock.setResult(undefined);

      const result = await firstValueFrom(component.article$);

      expect(result).toBeUndefined();

      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.title.value).toBeNull();
      expect(component.body.value).toBeNull();
    });

    it('should handle null article (invalid query param)', async () => {
      selectCurrentArticleMock.setResult(null);

      const result = await firstValueFrom(component.article$);

      expect(result).toBeUndefined();

      expect(router.navigate).toHaveBeenCalled();
      expect(component.title.value).toBeNull();
      expect(component.body.value).toBeNull();
    });

    it('should handle a matched article and author', async () => {
      const result = await firstValueFrom(component.article$);

      expect(result).toEqual(mockArticles[1]);

      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.title.value).toBe('title2');
      expect(component.body.value).toBe('body2');
    });

    it('should handle a mismatched article and author', async () => {
      selectCurrentArticleMock.setResult(mockArticles[2]);

      const result = await firstValueFrom(component.article$);

      expect(result).toBeUndefined();

      expect(router.navigate).toHaveBeenCalled();
      expect(component.title.value).toBeNull();
      expect(component.body.value).toBeNull();
    });
  });
});
