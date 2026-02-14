# Workshop

There's full testing in place for the NgRx implementation of 
Articles, and you will add testing for Authors. Use `mock.authors.
ts` to help your tests.

1. Run `npm run test ngrx-200` to execute the tests. The Articles
   tests run fine, but the Author tests are commented out.
2. Add testing for `author.reducer.ts`.
3. Add testing for `author.effects.ts`. You can use any of the 
   techniques from `article.effects.spec.ts` that avoid race 
   conditions.
4. Add testing for `author.selectors.ts` (`selectAuthor` is the only
   testable selector - test its projector function).
