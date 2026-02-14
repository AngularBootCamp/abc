/* eslint-disable @angular-eslint/prefer-inject */

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
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
  constructor(
    private readonly http: HttpClient,
    @Inject(CONSTELLATION_LOADER_CONFIG)
    private readonly config: ConstellationLoaderConfig
  ) {}

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
