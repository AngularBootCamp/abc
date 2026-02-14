import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { jsonRequestHeaders } from './httpUtils';

interface ISwapiStarShipResponse {
  results: { name: string }[];
}

// This special jsonRequestHeaders setting is needed with Firefox,
// but Chrome does the right thing with or without it.

@Component({
  selector: 'app-root',
  template: `
    <h3>Starships</h3>
    <ul>
      @for (s of starships; track s.name) {
        <li>{{ s.name }}</li>
      }
    </ul>
  `
})
export class AppComponent {
  starships: { name: string }[] = [];
  // Note that index.html changed to include http

  constructor() {
    const http = inject(HttpClient);

    // If you are using HTTP in this trivial one-shot way, it is
    // reasonable to convert to a Promise, if you prefer:
    firstValueFrom(
      http.get<ISwapiStarShipResponse>(
        'https://swapi.dev/api/starships/',
        { headers: jsonRequestHeaders }
      )
    )
      .then((response: ISwapiStarShipResponse) => {
        console.log(response);
        // throw ('broke on purpose');
        return response;
      })
      .then(
        (response: ISwapiStarShipResponse) =>
          (this.starships = response.results)
      )
      .catch(console.error);
  }
}
