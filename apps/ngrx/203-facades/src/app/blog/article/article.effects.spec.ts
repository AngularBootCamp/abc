import {
  fakeAsync,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Spy, createSpyFromClass } from 'jest-auto-spies';
import {
  firstValueFrom,
  Observable,
  of,
  Subject,
  throwError
} from 'rxjs';

import { ArticleLoaderService } from '../article-list/article-loader.service';
import { Article } from '../types';

import {
  articleApiActions,
  articleInitActions,
  articleListPageActions,
  articlePageActions
} from './article.actions';
import { ArticleEffects } from './article.effects';
import { mockArticles } from './mock.articles';

describe('ArticleEffects', () => {
  let actions$: Observable<Action>;
  let effects: ArticleEffects;
  let articleLoaderMock: Spy<ArticleLoaderService>;
  let metadata: EffectsMetadata<ArticleEffects>;

  beforeEach(() => {
    actions$ = new Subject<Action>();
    articleLoaderMock = createSpyFromClass(ArticleLoaderService);

    TestBed.configureTestingModule({
      providers: [
        ArticleEffects,
        provideMockActions(() => actions$),
        { provide: ArticleLoaderService, useValue: articleLoaderMock }
      ]
    });

    effects = TestBed.inject(ArticleEffects);
    metadata = getEffectsMetadata(effects);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('loadArticles', () => {
    // There are many ways to handle async tests. This one doesn't
    // work. If we run it by itself, it wouldn't fail, even though
    // there are mutually-exclusive assertions in the subscribe
    // block. The problem is a race condition - the test finishes
    // before the subscription, so it declares success before the
    // assertions are checked.
    // When run with other tests, it will sometimes make later
    // tests fail, which is hard to debug
    xit('should fail, but does not (bad test)', () => {
      // spy on the service call
      // this makes sure we're not testing the service, just the effect
      articleLoaderMock.load.mockReturnValue(of(mockArticles));

      // check that the output of the effect is what we expect it to be
      effects.loadArticles$.subscribe(a => {
        expect(a).toEqual(
          articleApiActions.loadArticlesSuccess({
            articles: mockArticles
          })
        );

        // check that the service was called
        expect(articleLoaderMock.load).toHaveBeenCalled();
        // this should fail (because the previous line passed)
        expect(articleLoaderMock.load).not.toHaveBeenCalled();
      });

      // emit an action
      (actions$ as Subject<Action>).next(
        articleInitActions.loadArticles()
      );
    });

    // Wrapping an async test in waitForAsync makes the test wait
    // for the assertions in the subscribe block. This is
    // sufficient if there are no delay or similar operations.
    it('should load articles', waitForAsync(() => {
      // spy on the service call
      // this makes sure we're not testing the service, just the effect
      articleLoaderMock.load.mockReturnValue(of(mockArticles));

      // check that the output of the effect is what we expect it to be
      effects.loadArticles$.subscribe(a => {
        expect(a).toEqual(
          articleApiActions.loadArticlesSuccess({
            articles: mockArticles
          })
        );

        // check that the service was called
        expect(articleLoaderMock.load).toHaveBeenCalled();
      });

      // emit an action
      (actions$ as Subject<Action>).next(
        articleInitActions.loadArticles()
      );
    }));

    // Capturing the emitted value in a subscribe block and checking
    // it outside the subscribe block works for async tests
    it('should handle article loading failing', () => {
      let action = undefined;
      articleLoaderMock.load.mockReturnValue(
        throwError(() => 'oops')
      );
      effects.loadArticles$.subscribe(a => (action = a));
      (actions$ as Subject<Action>).next(
        articleInitActions.loadArticles()
      );

      // Assert
      expect(action).toEqual(
        articleApiActions.loadArticlesFailure({ error: 'oops' })
      );
    });
  });

  describe('createArticle', () => {
    let newArticle: Omit<Article, 'id'>;

    beforeEach(() => {
      newArticle = {
        authorId: 3,
        title: 'titleNew',
        body: 'bodyNew'
      };
    });

    // Using fakeAsync with tick() is an effective way to handle
    // async tests, and it handles delays and other operations well
    it('should create an article', fakeAsync(() => {
      const newArticleWithId = {
        ...newArticle,
        id: 4
      };

      articleLoaderMock.create.mockReturnValue(of(newArticleWithId));
      effects.createArticle$.subscribe(a => {
        expect(a).toEqual(
          articleApiActions.createArticleSuccess({
            article: newArticleWithId
          })
        );
      });
      (actions$ as Subject<Action>).next(
        articleListPageActions.createArticle({ article: newArticle })
      );
      tick();
    }));

    // Using firstValueFrom to convert the Observable to a Promise
    // and then using async/await is an effective way to handle
    // async tests
    it('should handle article creation failing', async () => {
      articleLoaderMock.create.mockReturnValue(
        throwError(() => 'oops')
      );
      const result = firstValueFrom(effects.createArticle$);
      (actions$ as Subject<Action>).next(
        articleListPageActions.createArticle({ article: newArticle })
      );

      expect(await result).toEqual(
        articleApiActions.createArticleFailure({ error: 'oops' })
      );
    });
  });

  describe('deleteArticle', () => {
    let spyConfirm: jest.SpyInstance;

    beforeEach(() => {
      spyConfirm = jest
        .spyOn(window, 'confirm')
        .mockReturnValue(true);

      articleLoaderMock.delete.mockReturnValue(of({}));
    });

    it('should handle declining', () => {
      spyConfirm.mockReturnValue(false);

      actions$ = of(
        articlePageActions.deleteArticle({ article: mockArticles[1] })
      );

      // ObserverSpy (https://github.com/hirezio/observer-spy) is a
      // useful library for testing corner cases, like an observable
      // that doesn't emit due to a filter.
      const observerSpy = subscribeSpyTo(effects.deleteArticle$);

      expect(observerSpy.receivedNext()).toEqual(false);

      expect(spyConfirm).toHaveBeenCalled();
      expect(articleLoaderMock.delete).not.toHaveBeenCalled();
    });

    // ObserverSpy can also be used for standard async tests
    it('should delete an article with confirmation', () => {
      actions$ = of(
        articlePageActions.deleteArticle({ article: mockArticles[1] })
      );

      const observerSpy = subscribeSpyTo(effects.deleteArticle$);

      expect(observerSpy.getFirstValue()).toEqual(
        articleApiActions.deleteArticleSuccess({ articleId: 2 })
      );

      expect(spyConfirm).toHaveBeenCalled();
      expect(articleLoaderMock.delete).toHaveBeenCalled();
    });

    it('should handle article deletion failing after confirmation', waitForAsync(() => {
      articleLoaderMock.delete.mockReturnValue(
        throwError(() => 'oops')
      );
      effects.deleteArticle$.subscribe(a => {
        expect(a).toEqual(
          articleApiActions.deleteArticleFailure({ error: 'oops' })
        );
      });
      (actions$ as Subject<Action>).next(
        articlePageActions.deleteArticle({ article: mockArticles[1] })
      );
    }));
  });

  describe('updateArticle', () => {
    let updatedArticle: Article;

    beforeEach(() => {
      updatedArticle = { ...mockArticles[2], title: 'changedTitle' };
    });

    it('should update an article', waitForAsync(() => {
      articleLoaderMock.update.mockReturnValue(of(updatedArticle));
      effects.updateArticle$.subscribe(a => {
        expect(a).toEqual(
          articleApiActions.updateArticleSuccess({
            article: updatedArticle
          })
        );
      });
      (actions$ as Subject<Action>).next(
        articlePageActions.updateArticle({
          article: updatedArticle
        })
      );
    }));

    it('should handle article update failing', waitForAsync(() => {
      articleLoaderMock.update.mockReturnValue(
        throwError(() => 'oops')
      );
      effects.updateArticle$.subscribe(a => {
        expect(a).toEqual(
          articleApiActions.updateArticleFailure({ error: 'oops' })
        );
      });
      (actions$ as Subject<Action>).next(
        articlePageActions.updateArticle({
          article: updatedArticle
        })
      );
    }));
  });

  describe('handleError', () => {
    it('should not dispatch', () => {
      expect(metadata.handleError$?.dispatch).toBe(false);
    });

    it.each([
      { actionCreator: articleApiActions.loadArticlesFailure },
      { actionCreator: articleApiActions.createArticleFailure },
      { actionCreator: articleApiActions.deleteArticleFailure },
      { actionCreator: articleApiActions.updateArticleFailure }
    ])(
      'should log a value for $actionCreator.type',
      ({ actionCreator }) => {
        jest.spyOn(console, 'error').mockImplementation();

        const action = actionCreator({ error: 'oops' });

        actions$ = of(action);

        // Note that because we don't transform the stream in any way,
        // the output of the effect is the same as the input.
        const observerSpy = subscribeSpyTo(effects.handleError$);
        expect(observerSpy.getFirstValue()).toEqual(action);

        expect(console.error).toHaveBeenCalled();
      }
    );
  });
});
