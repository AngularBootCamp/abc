import { Observable } from 'rxjs';

export abstract class ClickService {
  abstract clickCount: Observable<number>;

  abstract increment(): Promise<void>;
}
