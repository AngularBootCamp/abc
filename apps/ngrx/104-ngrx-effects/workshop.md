# Workshop

With Effects, our Articles are now fully CRUD to the server. We 
will not make all of those changes for Authors, because Authors 
are read-only, but we will improve loading the Authors and add 
error handling.

1. We don't need to make any changes to `author.actions.ts` - the
   schematic added all the actions we need in the previous workshop.
2. Uncomment the contents of `AuthorEffects`. Replace `EMPTY` with a
   call to `AuthorLoaderService.load()`.
3. In `AuthorEffects`, add an initialization hook to invoke the
   `loadAuthors` action.
4. In `AuthorEffects`, add a non-dispatching effect to handle the
   errors.
5. Uncomment the reference to `AuthorEffects` in `blog.routes.ts` and 
   remove the constructor.

## Notes

1. Don't worry about broken tests at this point.
