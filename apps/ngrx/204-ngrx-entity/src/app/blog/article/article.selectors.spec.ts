import { Dictionary } from '@ngrx/entity';

import { Article } from '../types';

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
    let entities: Dictionary<Article>;

    beforeEach(() => {
      entities = {
        1: mockArticles[0],
        2: mockArticles[1],
        3: mockArticles[2]
      };
    });

    it('should handle a matching id', () => {
      expect(selectCurrentArticle.projector(entities, 2)).toBe(
        mockArticles[1]
      );
    });

    it('should handle a non-matching id', () => {
      expect(
        selectCurrentArticle.projector(entities, 999)
      ).toBeNull();
    });

    it('should handle no id', () => {
      expect(
        selectCurrentArticle.projector(entities, undefined)
      ).toBeUndefined();
    });
  });
});
