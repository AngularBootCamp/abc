# Workshop

Goals:

* Add a new lazy-loaded feature.
* Add several new components.
* Set up initial routing.

-----

1. Use the Angular CLI to create the dashboard component.

```
npx ng generate component dashboard
```

2. Generate all the nested components to put inside the dashboard.
Add the 'dashboard/' prefix so they are added in the right structure.

For example, your commands may look something like this:

```
npx ng generate component dashboard/videoList
npx ng generate component dashboard/videoPlayer
npx ng generate component dashboard/statFilters
```

(The stat graphs component will be added later, time permitting.)

3. Set up routing.

Add a route to the dashboard component. Be sure to use lazy loading.

4. Assemble your static application.

Use the components you generated in step 2 to reconstruct the video
stat tracker app in the dashboard component. As you begin, of course,
the components will be placeholders without actual functionality.
