import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { FilmMeta, StarshipApiService } from './starship-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [JsonPipe]
})
export class AppComponent {
  starships: FilmMeta[] = [];

  constructor() {
    inject(StarshipApiService)
      .loadStarships()
      .then(ships => (this.starships = ships))
      .catch(_err => (this.starships = []));
  }
}
