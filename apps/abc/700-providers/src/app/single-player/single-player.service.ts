import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Subject,
  firstValueFrom,
  map,
  shareReplay,
  startWith,
  switchMap
} from 'rxjs';

import { ClickService } from '../click.service';

// Local API server
// const apiUrl = '/api';

// Hosted API server
const apiUrl = 'https://api.angularbootcamp.com';

@Injectable()
export class SinglePlayerService implements ClickService {
  private http = inject(HttpClient);

  private refresh = new Subject<void>();
  readonly clickCount = this.refresh.pipe(
    startWith(undefined),
    switchMap(() =>
      this.http.get<{ count: number }>(apiUrl + '/count')
    ),
    map(response => response.count),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  constructor() {
    console.log('Single Player Service Activated');
  }

  async increment() {
    await firstValueFrom(this.http.post(apiUrl + '/increment', ''));
    this.refresh.next();
  }
}
