import { selectAuthor } from './author.selectors';
import { mockAuthors } from './mock.authors';

describe('Author Selectors', () => {
  describe('selectAuthor', () => {
    it('should handle a number id', () => {
      expect(selectAuthor(2).projector(mockAuthors)).toBe(
        mockAuthors[1]
      );
    });

    it('should handle a string id', () => {
      expect(selectAuthor('2').projector(mockAuthors)).toBe(
        mockAuthors[1]
      );
    });
  });
});
