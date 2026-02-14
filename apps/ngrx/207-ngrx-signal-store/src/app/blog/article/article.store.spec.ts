import { fakeAsync, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Spy, createSpyFromClass } from 'jest-auto-spies';
import { of, throwError } from 'rxjs';

import { selectCurrentArticleId } from '../../router.selectors';
import { ArticleLoaderService } from '../article-list/article-loader.service';
import { Article } from '../types';

import { ArticleStore } from './article.store';
import { mockArticles } from './mock.articles';

describe('ArticleStore', () => {
  let store: ArticleStore;
  let articleLoaderMock: Spy<ArticleLoaderService>;
  let mockStore: MockStore;

  beforeEach(() => {
    articleLoaderMock = createSpyFromClass(ArticleLoaderService);
    articleLoaderMock.load.mockReturnValue(of(mockArticles));

    TestBed.configureTestingModule({
      providers: [
        provideMockStore({}),
        { provide: ArticleLoaderService, useValue: articleLoaderMock }
      ]
    });

    store = TestBed.inject(ArticleStore);
    mockStore = TestBed.inject(MockStore);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('currentArticle', () => {
    it('should handle a matching id', () => {
      // Arrange
      mockStore.overrideSelector(selectCurrentArticleId, 2);

      // Act
      const result = store.currentArticle();

      // Assert
      expect(result).toBe(mockArticles[1]);
    });

    it('should handle a non-matching id', () => {
      // Arrange
      mockStore.overrideSelector(selectCurrentArticleId, 999);

      // Act
      const result = store.currentArticle();

      // Assert
      expect(result).toBeNull();
    });

    it('should handle no id', () => {
      // Arrange
      mockStore.overrideSelector(selectCurrentArticleId, undefined);

      // Act
      const result = store.currentArticle();

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe('loadArticles', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation();
    });

    it('should load articles', () => {
      // Arrange
      const newArticles: Article[] = [
        {
          authorId: 1,
          id: 1,
          title: 'newArticle',
          body: 'All the words'
        }
      ];
      articleLoaderMock.load.mockReturnValue(of(newArticles));

      // Act
      store.load();

      // Assert
      expect(store.ids()).toEqual([1]);
      expect(store.entities()).toEqual(newArticles);
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should handle article loading failing', () => {
      // Arrange
      articleLoaderMock.load.mockReturnValue(
        throwError(() => 'oops')
      );

      // Act
      store.load();

      // Assert
      expect(store.ids()).toEqual([1, 2, 3]);
      expect(store.entities()).toEqual(mockArticles);
      expect(console.error).toHaveBeenCalled();
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
      jest.spyOn(console, 'error').mockImplementation();
    });

    it('should create an article', fakeAsync(() => {
      // Arrange
      const newArticleWithId = {
        ...newArticle,
        id: 4
      };
      articleLoaderMock.create.mockReturnValue(of(newArticleWithId));

      // Act
      store.createArticle(newArticle);

      // Assert
      expect(store.ids()).toEqual([1, 2, 3, 4]);
      expect(store.entities()).toEqual([
        mockArticles[0],
        mockArticles[1],
        mockArticles[2],
        newArticleWithId
      ]);
      expect(console.error).not.toHaveBeenCalled();
    }));

    it('should handle article creation failing', async () => {
      // Arrange
      articleLoaderMock.create.mockReturnValue(
        throwError(() => 'oops')
      );

      // Act
      store.createArticle(newArticle);

      // Assert
      expect(store.entities()).toEqual(mockArticles);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('deleteArticle', () => {
    let spyConfirm: jest.SpyInstance;

    beforeEach(() => {
      spyConfirm = jest
        .spyOn(window, 'confirm')
        .mockReturnValue(true);

      articleLoaderMock.delete.mockReturnValue(of({}));
      jest.spyOn(console, 'error').mockImplementation();
    });

    it('should handle declining', () => {
      // Arrange
      spyConfirm.mockReturnValue(false);

      // Act
      store.deleteArticle(mockArticles[1]);

      // Assert
      expect(spyConfirm).toHaveBeenCalled();
      expect(articleLoaderMock.delete).not.toHaveBeenCalled();
      expect(store.entities()).toEqual(mockArticles);
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should delete an article with confirmation', fakeAsync(() => {
      // Arrange

      // Act
      store.deleteArticle(mockArticles[1]);

      // Assert
      expect(spyConfirm).toHaveBeenCalled();
      expect(store.ids()).toEqual([1, 3]);
      expect(store.entities()).toEqual([
        mockArticles[0],
        mockArticles[2]
      ]);
      expect(console.error).not.toHaveBeenCalled();
    }));

    it('should handle article deletion failing after confirmation', async () => {
      // Arrange
      articleLoaderMock.delete.mockReturnValue(
        throwError(() => 'oops')
      );

      // Act
      store.deleteArticle(mockArticles[1]);

      // Assert
      expect(spyConfirm).toHaveBeenCalled();
      expect(store.entities()).toEqual(mockArticles);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('updateArticle', () => {
    let updatedArticle: Article;

    beforeEach(() => {
      updatedArticle = {
        ...mockArticles[2],
        title: 'changedTitle'
      };
      jest.spyOn(console, 'error').mockImplementation();
    });

    it('should update an article', () => {
      // Arrange
      articleLoaderMock.update.mockReturnValue(of(updatedArticle));

      // Act
      store.updateArticle(updatedArticle);

      // Assert
      expect(store.ids()).toEqual([1, 2, 3]);
      expect(store.entities()).toEqual([
        mockArticles[0],
        mockArticles[1],
        {
          authorId: 2,
          id: 3,
          title: 'changedTitle',
          body: 'body3'
        }
      ]);
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should handle article update failing', () => {
      // Arrange
      articleLoaderMock.update.mockReturnValue(
        throwError(() => 'oops')
      );

      // Act
      store.updateArticle(updatedArticle);

      // Assert
      expect(store.entities()).toEqual(mockArticles);
      expect(console.error).toHaveBeenCalled();
    });
  });
});
