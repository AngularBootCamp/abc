import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  Constellation,
  ConstellationLoaderConfig,
  CONSTELLATION_LOADER_CONFIG
} from '../types';

@Injectable({
  providedIn: 'root'
})
export class ConstellationLoader {
  private readonly http = inject(HttpClient);
  private readonly config = inject<ConstellationLoaderConfig>(
    CONSTELLATION_LOADER_CONFIG
  );

  getConstellations(): Observable<Constellation[]> {
    return this.http.get<Constellation[]>(this.config.endpoint, {
      params: {
        _sort: 'name'
      }
    });
  }

  getConstellation(
    iauAbbreviation: string
  ): Observable<Constellation> {
    return this.http
      .get<
        Constellation[]
      >(`${this.config.endpoint}?iauAbbreviation=${iauAbbreviation}`)
      .pipe(map(results => results[0]));
  }
}
