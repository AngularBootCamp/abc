import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { jsonRequestHeaders } from './httpUtils';

export interface FilmMeta {
  name: string;
  filmName?: string;
  films: string[];
}

export interface Film {
  title: string;
}

@Injectable({ providedIn: 'root' })
export class StarshipApiService {
  private http = inject(HttpClient);

  loadStarships(): Promise<FilmMeta[]> {
    return firstValueFrom(
      this.http.get<{ results: FilmMeta[] }>(
        'https://swapi.dev/api/starships/',
        {
          headers: jsonRequestHeaders
        }
      )
    ).then(shipList => {
      // Promise-based APIs still work fine:
      console.log('Ship list retrieved, GETting film data', shipList);
      return Promise.all(
        shipList.results.map((ship: FilmMeta) => {
          console.log('GETting film data for ' + ship.name);
          return firstValueFrom(
            this.http.get<Film>(ship.films[0], {
              headers: jsonRequestHeaders
            })
          ).then(film => {
            ship.filmName = film.title;
            return ship;
          });
        })
      );
    });
  }
}
