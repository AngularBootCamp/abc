import {
  selectCurrentArticle,
  selectArticlesByAuthor
} from './article.selectors';
import { mockArticles } from './mock.articles';

describe('Article Selectors', () => {
  describe('selectArticlesByAuthor', () => {
    it('should handle a string id', () => {
      expect(
        selectArticlesByAuthor('1').projector(mockArticles)
      ).toEqual([mockArticles[0], mockArticles[1]]);
    });

    it('should handle a number id', () => {
      expect(
        selectArticlesByAuthor(1).projector(mockArticles)
      ).toEqual([mockArticles[0], mockArticles[1]]);
    });
  });

  describe('selectCurrentArticle', () => {
    it('should handle a matching id', () => {
      expect(selectCurrentArticle.projector(mockArticles, 2)).toBe(
        mockArticles[1]
      );
    });

    it('should handle a non-matching id', () => {
      expect(
        selectCurrentArticle.projector(mockArticles, 999)
      ).toBeNull();
    });

    it('should handle no id', () => {
      expect(
        selectCurrentArticle.projector(mockArticles, undefined)
      ).toBeUndefined();
    });
  });
});
