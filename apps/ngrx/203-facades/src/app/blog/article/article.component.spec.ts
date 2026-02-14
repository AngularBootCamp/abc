import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Spy, createSpyFromClass } from 'jest-auto-spies';
import { Subject, firstValueFrom } from 'rxjs';

import { selectCurrentAuthorId } from '../../router.selectors';
import { ArticleService } from '../article-list/article.service';
import { Article } from '../types';

import { ArticleComponent } from './article.component';
import { mockArticles } from './mock.articles';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let router: Router;
  let mockStore: MockStore;
  let articleSvc: Spy<ArticleService>;
  let currentArticle: Subject<Article | undefined | null>;

  beforeEach(() => {
    articleSvc = createSpyFromClass(ArticleService, {
      observablePropsToSpyOn: ['currentArticle']
    });
    articleSvc.currentArticle.nextWith(mockArticles[1]);
    currentArticle = articleSvc.currentArticle.returnSubject();

    TestBed.configureTestingModule({
      providers: [
        ArticleComponent,
        provideMockStore({}),
        { provide: ArticleService, useValue: articleSvc }
      ],
      imports: [RouterTestingModule]
    });

    component = TestBed.inject(ArticleComponent);
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(selectCurrentAuthorId, 1);
  });

  describe('article$', () => {
    it('should handle undefined article (no query param)', async () => {
      currentArticle.next(undefined);

      const result = await firstValueFrom(component.article$);

      expect(result).toBeUndefined();

      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.title.value).toBeNull();
      expect(component.body.value).toBeNull();
    });

    it('should handle null article (invalid query param)', async () => {
      currentArticle.next(null);

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
      currentArticle.next(mockArticles[2]);

      const result = await firstValueFrom(component.article$);

      expect(result).toBeUndefined();

      expect(router.navigate).toHaveBeenCalled();
      expect(component.title.value).toBeNull();
      expect(component.body.value).toBeNull();
    });
  });
});
