import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';

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

  starships(): Observable<FilmMeta[]> {
    const url = 'https://swapi.dev/api/starships/';
    return this.http
      .get<{ results: FilmMeta[] }>(url, {
        headers: jsonRequestHeaders
      })
      .pipe(
        // extract results field
        map(shipWrapper => shipWrapper.results),
        mergeMap(ships => {
          const shipObservables = ships.map((ship: FilmMeta) => {
            console.log('GETting film data for ' + ship.name);
            return this.http
              .get<Film>(ship.films[0], {
                headers: jsonRequestHeaders
              })
              .pipe(
                map(film => {
                  ship.filmName = film.title;
                  return ship;
                })
              );
          });

          // forkJoin is somewhat like Promise.all();
          // array of Observables -> Observable of an array
          return forkJoin(shipObservables);
        })
      );
  }
}
