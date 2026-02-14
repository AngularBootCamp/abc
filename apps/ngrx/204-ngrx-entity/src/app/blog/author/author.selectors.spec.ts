import { selectCurrentAuthor } from './author.selectors';
import { mockAuthors } from './mock.authors';

describe('Author Selectors', () => {
  describe('selectCurrentAuthor', () => {
    it('should handle a matched id', () => {
      expect(selectCurrentAuthor.projector(mockAuthors, 2)).toBe(
        mockAuthors[1]
      );
    });

    it('should handle an unmatched id', () => {
      expect(
        selectCurrentAuthor.projector(mockAuthors, 999)
      ).toBeUndefined();
    });

    it('should handle an undefined', () => {
      expect(
        selectCurrentAuthor.projector(mockAuthors, undefined)
      ).toBeUndefined();
    });
  });
});
