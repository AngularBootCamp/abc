# Workshop

In this step, we've seen what a basic use of @ngrx/store looks like
for articles. We will add the same for authors. We will need to add
actions, reducers, and selectors.

This is a big workshop, and it involves adding the core of NgRx to an
application. Your instructor may break this up into multiple
workshops.

1. Add a Feature for the Authors by entering this in
  `apps/ngrx/103-ngrx-feature-modules/src/app`:
  `npx nx g @ngrx/schematics:feature blog/author/Author`.
   Answer Yes for the first question, accept the default for the
   rest. This will create the files you will need for this and
   later workshops.
2. Comment out all the contents of `AuthorEffects` in
   `author.effects.ts`; we will use this file in a later workshop. Also
   comment out any references to `AuthorEffects` in `blog.routes.ts`.
3. Change the payload of the `loadAuthorsSuccess` action to be an array
   of Authors called `authors`.
4. Add the state and implement the reducer for `loadAuthorsSuccess` and
   remove the reducers for `loadAuthors` and `loadAuthorFailure`.
5. Update `blog.routes.ts` to provide your reducer, if necessary.
6. Use the new selector of `selectAuthors` from the `authorFeature`
   to `author.selectors.ts` to return all the authors,and use this
   new selector in `AuthorListComponent` instead of using `AuthorService`.
7. Add a selector called `selectAuthor` to `author.selectors.ts` to return
   a single author when given an id, and use this new selector in
   `AuthorComponent` instead of using `AuthorService`.
8. Nothing should be using `AuthorService` now, so remove it.
9. Update `blog.routes,ts` to load the authors from `AuthorLoaderService`
   and dispatch `loadAuthorsSuccess` with the result (similar to how
   Articles are loaded).

   Note that this approach is not good practice; we will see the
   correct approach with Effects.

## Notes

1. Don't worry about broken tests at this point.
2. We have the dependencies in the abc.zip file already set up, but if
   you were doing this on a new app, you would have to add the
   appropriate ngrx dependencies for schematics. The easiest way is this CLI
   command:
   `npm install @ngrx/schematics --save-dev`.
3. If you have time, try moving the `selectedAuthorId` into the store
   (similar to the `selectedArticleId` being in the store). Here are the
   steps:
   1. Add `currentAuthorId` to the state that is managed for authors (this
      means State will change, and you'll need a new reducer function,
      a new selector, and a new action with the shape
      `{authorId: number}`).
   2. Add a compound selector called `selectCurrentAuthor` that takes the
      results of `selectAuthors` and `selectCurrentAuthorId` to retrieve the
      selected Author object. Use this
      selector in `AuthorComponent` instead of using the router and a
      `switchMap` on a `AuthorService` call.
   3. Change `ArticleComponent` and `ArticleListComponent` to get the current
      authorId from store instead of from the router or the parent.
