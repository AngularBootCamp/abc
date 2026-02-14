import {
  BehaviorSubject,
  Observable,
  defer,
  merge,
  timer,
  delayWhen,
  filter,
  map,
  retryWhen,
  switchMap,
  tap
} from 'rxjs';

export enum LoadResultStatus {
  InProgress,
  Retrying,
  Waiting,
  Success,
  Error
}

export const statusStrings = [
  'In Progress',
  'Retrying',
  'Waiting to Retry',
  'Success',
  'Error'
];

export interface LoadResult<T> {
  status: LoadResultStatus;
  payload?: T;
  error?: unknown;
  willRetry?: boolean;
}

interface Options {
  // To retry once after failure, use attempts=2
  attempts: number;
  retryDelayMs: number;
  retryBackoffCoefficient: number;
  retryMaxDelayMs: number;
}

export type LoadWithRetryOptions = Partial<Options>;

const defaultOptions: Options = {
  attempts: 3,
  retryDelayMs: 2000,
  retryBackoffCoefficient: 1.5,
  retryMaxDelayMs: 30000
};

export function loadWithRetry<S, T>(
  source: Observable<S>,
  producer: (key: S) => Observable<T>,
  opts?: LoadWithRetryOptions
): Observable<LoadResult<T>> {
  const options = { ...defaultOptions, ...opts };

  return source.pipe(
    switchMap(key => {
      const notifications = new BehaviorSubject<LoadResult<T>>({
        status: LoadResultStatus.InProgress
      });
      let attempt = 0;
      return merge(
        notifications,
        defer(() => {
          attempt++;
          return producer(key);
        }).pipe(
          retryWhen(errors =>
            errors.pipe(
              tap(error =>
                notifications.next({
                  status: LoadResultStatus.Error,
                  error,
                  willRetry: attempt < options.attempts
                })
              ),
              filter(_ => attempt < options.attempts),
              tap(_ =>
                notifications.next({
                  status: LoadResultStatus.Waiting
                })
              ),
              delayWhen(() => retryDelay(options, attempt)),
              tap(_ =>
                notifications.next({
                  status: LoadResultStatus.Retrying
                })
              )
            )
          ),
          map((payload: T) => ({
            status: LoadResultStatus.Success,
            payload
          }))
        )
      );
    })
  );
}

function retryDelay(
  options: Options,
  attempt: number
): Observable<0> {
  const jitter = (Math.random() - 0.5) * options.retryDelayMs * 0.5;
  let delay =
    options.retryDelayMs *
      Math.pow(options.retryBackoffCoefficient, attempt - 1) +
    jitter;
  delay = Math.min(delay, options.retryMaxDelayMs);
  return timer(delay);
}
