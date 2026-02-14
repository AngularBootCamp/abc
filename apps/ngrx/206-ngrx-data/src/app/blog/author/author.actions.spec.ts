import { authorInitActions } from './author.actions';

describe('loadAuthors', () => {
  it('should return an action', () => {
    expect(authorInitActions.loadAuthors().type).toBe(
      '[Author Init] Load Authors'
    );
  });
});
