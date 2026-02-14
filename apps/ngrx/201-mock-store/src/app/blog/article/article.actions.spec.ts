import { articleInitActions } from './article.actions';

describe('loadArticles', () => {
  it('should return an action', () => {
    expect(articleInitActions.loadArticles().type).toBe(
      '[Article Init] Load Articles'
    );
  });
});
