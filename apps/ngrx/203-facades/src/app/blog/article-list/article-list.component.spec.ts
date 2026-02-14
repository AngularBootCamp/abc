import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Spy, createSpyFromClass } from 'jest-auto-spies';
import { firstValueFrom, of } from 'rxjs';

import { ConfigService } from '../../config.service';
import { AppState } from '../../reducers';
import { selectCurrentAuthorId } from '../../router.selectors';
import { mockArticles } from '../article/mock.articles';

import { ArticleListComponent } from './article-list.component';
import { ArticleService } from './article.service';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let configSvc: Spy<ConfigService>;
  let selectMockCurrentAuthorId: MemoizedSelector<
    AppState,
    number | undefined
  >;
  let articleSvc: Spy<ArticleService>;

  beforeEach(() => {
    configSvc = createSpyFromClass(ConfigService, {
      observablePropsToSpyOn: ['title']
    });
    configSvc.title.nextWith('Blog Title');

    articleSvc = createSpyFromClass(ArticleService);

    TestBed.configureTestingModule({
      providers: [
        ArticleListComponent,
        provideMockStore({}),
        { provide: ConfigService, useValue: configSvc },
        { provide: ArticleService, useValue: articleSvc }
      ],
      imports: [RouterTestingModule]
    });

    component = TestBed.inject(ArticleListComponent);
    const mockStore = TestBed.inject(MockStore);
    selectMockCurrentAuthorId = mockStore.overrideSelector(
      selectCurrentAuthorId,
      2
    );
  });

  describe('getArticlesByAuthor', () => {
    beforeEach(() => {
      articleSvc.getArticlesByAuthor.mockReturnValue(
        of([mockArticles[0], mockArticles[1]])
      );
    });

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
      selectMockCurrentAuthorId.setResult(2);

      const result = await firstValueFrom(component.authorId);

      expect(result).toEqual(2);
    });

    it('should handle a missing authorId', () => {
      selectMockCurrentAuthorId.setResult(undefined);

      const observerSpy = subscribeSpyTo(component.authorId);

      expect(observerSpy.receivedNext()).toEqual(false);
    });
  });

  describe('articles', () => {
    it('should get the articles', async () => {
      selectMockCurrentAuthorId.setResult(2);
      articleSvc.getArticlesByAuthor.mockReturnValue(
        of([mockArticles[2]])
      );

      const result = await firstValueFrom(component.articles);

      expect(result).toEqual([mockArticles[2]]);
      expect(articleSvc.getArticlesByAuthor).toHaveBeenCalledWith(2);
    });
  });
});
