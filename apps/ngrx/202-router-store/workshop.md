# Workshop

The route is the ultimate source of information for the current 
author and the selected article. Before this step, we were 
manually putting both into NgRx, and current author is still there.
We will now use @ngrx/router-store to manage the interaction 
between the router and NgRx.

1. Add `selectCurrentAuthorId` to `router.selectors.ts`. Note that 
   it'll use `selectRouteParam`, not the `selectQueryParam` that 
   the article selector uses.
2. Add `selectCurrentAuthor` as a compound selector to `author.
   selectors.ts`. This replaces the existing `selectAuthor` 
   selector, which you can remove.
3. Change all components that use `ActivatedRoute` or an `@Input()
   ` for `authorId` to use `selectCurrentAuthorId` or 
   `selectCurrentAuthor` instead. This will involve 
   `ArticleListComponent` and `AuthorComponent`.
4. (Optional): Update the tests. The code to mock out 
   `ActivatedRoute` can go away.

## Notes

1. The dependencies are already installed, and `main.ts` already 
   knows about `RouterStore`, because we ran
   `npx ng add @ngrx/router-store --project ngrx202-router-store`
   in the root directory to set up articles routing.
