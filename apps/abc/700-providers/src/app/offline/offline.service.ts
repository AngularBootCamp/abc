import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ClickService } from '../click.service';

@Injectable()
export class OfflineService implements ClickService {
  // There are various ways to achieve an Observable that emits a
  // current value on subscribe; this is one of the more common.
  private readonly clicks = new BehaviorSubject<number>(0);
  readonly clickCount = this.clicks.asObservable();

  constructor() {
    console.log('Offline Service Activated');
  }

  async increment() {
    this.clicks.next(this.clicks.value + 1);
  }
}
