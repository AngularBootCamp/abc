import { Service, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import {
  CONSTELLATION_LOADER_CONFIG,
  Constellation,
  ConstellationLoaderConfig,
} from '../types';

@Service()
export class ConstellationLoader {
  private readonly http = inject(HttpClient);
  private readonly config = inject<ConstellationLoaderConfig>(
    CONSTELLATION_LOADER_CONFIG,
  );

  getConstellations(): Observable<Constellation[]> {
    return this.http.get<Constellation[]>(this.config.endpoint, {
      params: {
        _sort: 'name',
      },
    });
  }

  getConstellation(iauAbbreviation: string): Observable<Constellation> {
    return this.http
      .get<Constellation[]>(
        `${this.config.endpoint}?iauAbbreviation=${iauAbbreviation}`,
      )
      .pipe(map(results => results[0]));
  }
}
