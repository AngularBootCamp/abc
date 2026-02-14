# Workshop

* Move the sample data from VideoListComponent to
  DashboardComponent and pass it down into the VideoListComponent.

* Make a component that represents a single video in the list:

```
npx ng generate component dashboard/video-thumbnail
```

* Update your `@for` to use that component instead of plain HTML.

* Use component data binding to supply the data for each video entry.

* Verify that clicking a video still results in visually identifying
  the selected video.
