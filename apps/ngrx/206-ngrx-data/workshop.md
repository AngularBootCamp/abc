# Workshop

In this step, we replace our @ngrx/entity implementations with
@ngrx/data for authors and articles.

1. Install the dependencies and set up the boilerplate with
`npx ng add @ngrx/data`.
2. Data will use `api/author` or `api/authors` depending on the endpoint.
   Our server accepts only `/api/authors`. Copy the
   `PluralHttpUrlGenerator` from this step into your app, along with
   the entire `providers` array from `main.ts`.
3. Add Author to the EntityMetadataMap in `entity-metadata.ts`.
   You can remove pluralNames, because authors and articles both use
   regular pluralization.
4. Create a new AuthorDataService that extends
   EntityCollectionServiceBase. Add `this.load()` to the constructor.
5. Modify `AuthorService.authors` to use the `entities$` property on the
   new service.
6. Change `AuthorService.currentAuthor` to combine the latest of the
   `authors` and `currentAuthorId` Observables.
7. With Data in place,  `author.actions.ts`', `author.effects.ts`,
   `author.reducer.ts`, `author.selectors.ts`, and
   `author-loader.service.ts` are obsolete; remove them (along with
   their tests and other references to them).
