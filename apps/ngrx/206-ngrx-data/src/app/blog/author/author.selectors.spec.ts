import { Dictionary } from '@ngrx/entity';

import { Author } from '../types';

import { selectCurrentAuthor } from './author.selectors';
import { mockAuthors } from './mock.authors';

describe('Author Selectors', () => {
  describe('selectCurrentAuthor', () => {
    let entities: Dictionary<Author>;

    beforeEach(() => {
      entities = { 1: mockAuthors[0], 2: mockAuthors[1] };
    });

    it('should handle a matched id', () => {
      expect(selectCurrentAuthor.projector(entities, 2)).toBe(
        mockAuthors[1]
      );
    });

    it('should handle an unmatched id', () => {
      expect(
        selectCurrentAuthor.projector(entities, 999)
      ).toBeUndefined();
    });

    it('should handle an undefined', () => {
      expect(
        selectCurrentAuthor.projector(entities, undefined)
      ).toBeUndefined();
    });
  });
});
