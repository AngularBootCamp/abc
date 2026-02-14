import { Injectable, inject } from '@angular/core';
import { share } from 'rxjs';

import { FxQuote } from './fx-quote';
import { SseService } from './sse.service';

// Local API server
// const apiUrl = '/api';

// Hosted API server
const apiUrl = 'https://api.angularbootcamp.com';

@Injectable({
  providedIn: 'root'
})
export class FxDataService {
  fxData = inject(SseService)
    .observe<FxQuote>(apiUrl + '/fx/lowfreq')
    .pipe(share());
}
