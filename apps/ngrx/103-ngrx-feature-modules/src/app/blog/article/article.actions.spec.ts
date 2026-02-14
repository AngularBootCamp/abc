import { articleActions } from './article.actions';

describe('loadArticles', () => {
  it('should return an action', () => {
    expect(articleActions.loadArticles().type).toBe(
      '[Article] Load Articles'
    );
  });
});
