import {
  articleApiActions,
  articleListPageActions
} from './article.actions';
import { initialState, articleFeature } from './article.reducer';
import { mockArticles } from './mock.articles';

describe('Article Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = articleFeature.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('loadArticlesSuccess', () => {
    it('should load articles', () => {
      const articles = mockArticles;
      const result = articleFeature.reducer(
        initialState,
        articleApiActions.loadArticlesSuccess({ articles })
      );

      expect(result.articles).toEqual(articles);
    });
  });

  describe('createArticleSuccess', () => {
    it('should create an article', () => {
      const newArticle = {
        authorId: 3,
        id: 4,
        title: 'titleNew',
        body: 'bodyNew'
      };

      const result = [
        articleApiActions.loadArticlesSuccess({
          articles: mockArticles
        }),
        articleApiActions.createArticleSuccess({
          article: newArticle
        })
      ].reduce(articleFeature.reducer, initialState);

      expect(result.articles.length).toBe(4);
      expect(result.articles[3]).toEqual(newArticle);
    });
  });

  describe('deleteArticleSuccess', () => {
    it('should delete an article', () => {
      const result = [
        articleApiActions.loadArticlesSuccess({
          articles: mockArticles
        }),
        articleApiActions.deleteArticleSuccess({
          articleId: 2
        })
      ].reduce(articleFeature.reducer, initialState);

      expect(result.articles.length).toBe(2);
      expect(result.articles).not.toContainEqual(mockArticles[1]);
    });
  });

  describe('updateArticleSuccess', () => {
    it('should update an article', () => {
      const newArticle = {
        ...mockArticles[2],
        title: 'changedTitle'
      };
      const result = [
        articleApiActions.loadArticlesSuccess({
          articles: mockArticles
        }),
        articleApiActions.updateArticleSuccess({
          article: newArticle
        })
      ].reduce(articleFeature.reducer, initialState);

      expect(result.articles.length).toBe(3);
      expect(result.articles[2]).toEqual(newArticle);
    });
  });

  describe('chooseArticle', () => {
    it('should select an article', () => {
      const result = articleFeature.reducer(
        initialState,
        articleListPageActions.chooseArticle({ articleId: 3 })
      );

      expect(result.articles.length).toBe(0);
      expect(result.currentArticleId).toBe(3);
    });
  });
});
