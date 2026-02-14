// This observable transformation can be used to simulate a faulty
// network or backend service. It adds random delays and random
// failure probability.

import { Observable, defer, throwError, timer, mergeMap } from 'rxjs';

export interface FaultyOptions {
  errorProbability?: number;
  maxDelayMs?: number;
}

const defaultOptions = {
  errorProbability: 0.3,
  maxDelayMs: 1000
};

export function faulty<T>(
  opts?: FaultyOptions
): (source: Observable<T>) => Observable<T> {
  const options = { ...defaultOptions, ...opts };
  return source =>
    defer<Observable<T>>(() =>
      timer(Math.random() * options.maxDelayMs).pipe(
        mergeMap(_value =>
          Math.random() < options.errorProbability
            ? throwError(() => new Error('Failed in faulty'))
            : source
        )
      )
    );
}
