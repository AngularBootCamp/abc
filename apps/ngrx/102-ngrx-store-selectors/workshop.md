# Workshop

We will add memoized selectors to access our blog title state.

1. Having the title state live directly on `AppState` is simple, but
   it doesn't scale well. Move the title string into a new
   `ConfigState` interface (it can stay in the same file), and change
   `AppState` to own a `config` property instead of the `title`
   property.
2. Change the `titleReducer` to a `configReducer`, which will involve
   changing the initial state and changing what is in the
   `ActionReducerMap`.
3. Use `createFeatureSelector` to select the `config` branch.
4. Use `createSelector` to select the `title` from the `config` branch.
5. Update `app.component.ts` and `article-list.component.ts` to 
   use the new memoized selector.
