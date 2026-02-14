import { articleApiActions } from './article.actions';
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

      expect(result.ids).toEqual([1, 2, 3]);
      expect(result.entities).toEqual({
        1: mockArticles[0],
        2: mockArticles[1],
        3: mockArticles[2]
      });
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

      expect(result.ids).toEqual([1, 2, 3, 4]);
      expect(result.entities).toEqual({
        1: mockArticles[0],
        2: mockArticles[1],
        3: mockArticles[2],
        4: newArticle
      });
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

      expect(result.ids).toEqual([1, 3]);
      expect(result.entities).toEqual({
        1: mockArticles[0],
        3: mockArticles[2]
      });
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

      expect(result.ids).toEqual([1, 2, 3]);
      expect(result.entities).toEqual({
        1: mockArticles[0],
        2: mockArticles[1],
        3: {
          authorId: 2,
          id: 3,
          title: 'changedTitle',
          body: 'body3'
        }
      });
    });
  });
});
