import { Injectable, NgZone, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  private zone = inject(NgZone);

  observe<T>(sseUrl: string): Observable<T> {
    return new Observable<T>(obs => {
      const es = new EventSource(sseUrl);
      es.onmessage = evt => {
        const data = JSON.parse(evt.data); // TODO handle parse error
        this.zone.run(() => obs.next(data));
      };
      return () => es.close();
    });
  }
}
