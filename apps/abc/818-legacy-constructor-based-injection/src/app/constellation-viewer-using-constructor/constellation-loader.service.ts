/* eslint-disable @angular-eslint/prefer-inject */

import { Inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import {
  CONSTELLATION_LOADER_CONFIG,
  Constellation,
  ConstellationLoaderConfig,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class ConstellationLoader {
  constructor(
    private readonly http: HttpClient,
    @Inject(CONSTELLATION_LOADER_CONFIG)
    private readonly config: ConstellationLoaderConfig,
  ) {}

  getConstellations(): Observable<Constellation[]> {
    return this.http.get<Constellation[]>(this.config.endpoint, {
      params: {
        _sort: 'name',
      },
    });
  }

  getConstellation(iauAbbreviation: string): Observable<Constellation> {
    return this.http
      .get<
        Constellation[]
      >(`${this.config.endpoint}?iauAbbreviation=${iauAbbreviation}`)
      .pipe(map(results => results[0]));
  }
}
