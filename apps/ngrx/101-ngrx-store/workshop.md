# Workshop

At this point, we have learned how to put global state into the store,
but we don't know how to do this for state in a lazily-loaded feature.
The only state the application holds globally is the configuration. We
will move that into NgRx; the authors and articles will come in a 
later workshop.

We will apply the lessons from the ngrx101 demo app (the fruit picker)
to the ngrx100 demo app.

1. Create a file at `src/app/reducers/index.ts` and add an action to
   update the blog title.
2. In the same file, create the `AppState` interface. It should have this
   body: `{ title: string; }`
3. Create a reducer that manages the blog title
4. Provide the reducer to your application main.ts
5. Update the components to use NgRx for this information, both
   dispatching the change to the title and selecting the current title
   value.
6. Remove ConfigService

## Notes

1. We have the dependencies in the abc.zip file already set up, but if
   you were doing this on a new app, you would have to add the
   appropriate ngrx dependencies. The easiest way is this CLI
   schematic (within the `apps/ngrx/100-workshop` directory):
   `npx ng add @ngrx/store --minimal false`. In addition to setting up the
   dependencies, this updates `main.ts` and creates the initial
   files.
2. We have dev-tools already installed in the abc.zip file, but you
   would need to add it separately to a new app in order to use the
   [Redux Dev Tools][devtools] Chrome extension:
   `npx ng add @ngrx/store-devtools`.

[devtools]:
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
