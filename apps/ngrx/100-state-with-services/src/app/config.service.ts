import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private _title = new ReplaySubject<string>();
  readonly title = this._title.asObservable();

  constructor() {
    this._title.next('Our Blog');
  }

  setTitle(value: string) {
    this._title.next(value);
  }
}
