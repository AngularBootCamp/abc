import { authorApiActions } from './author.actions';
import { initialState, authorFeature } from './author.reducer';
import { mockAuthors } from './mock.authors';

describe('Author Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = authorFeature.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('loadAuthorsSuccess', () => {
    it('should load authors', () => {
      const authors = mockAuthors;
      const result = authorFeature.reducer(
        initialState,
        authorApiActions.loadAuthorsSuccess({ authors })
      );

      expect(result.authors).toEqual(authors);
    });
  });
});
