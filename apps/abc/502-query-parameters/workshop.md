# Workshop

* Update the list to navigate whenever a video is clicked using
  routerLink, rather than emitting an event.
* Consume the query param state to drive the selected video
* Use that query param state to hydrate our initially selected video.

## Bonus

Whenever a video is selected via the Query Param, 
fetch the full video object data from the API using the ID.

You can request a single item from the demo API server, as long as the
items contain an "id" property. For example, you could retrieve
information about a video where the "id" property is "xyz123" like so:

  http://localhost:8085/videos/xyz123

  https://api.angularbootcamp.com/videos/xyz123

(Adjust as appropriate if your API URL is different.)
