import { Observable } from 'rxjs';

export abstract class ClickService {
  public abstract clickCount: Observable<number>;

  public abstract increment(): Promise<void>;
}
