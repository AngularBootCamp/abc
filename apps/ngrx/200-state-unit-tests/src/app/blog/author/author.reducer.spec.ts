import { authorFeature, initialState } from './author.reducer';

describe('Author Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = authorFeature.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
