import { initialState, articleFeature } from './article.reducer';

describe('Article Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = articleFeature.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
