import { HttpClient } from '@angular/common/http';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';

interface LocationDetails {
  places: { longitude: number }[];
}

// Many TypeScript developers recommend always using undefined rather
// than null; however, the Angular documentation specifically states
// that an async validator should return an observable of either
// ValidationErrors or null.

export function simpleAsyncValidator(): Observable<ValidationErrors | null> {
  // return of({ simpleAsyncValidator: 'blew up' });
  // OK
  return of(null);
}

export function slowAsyncValidator(): Observable<ValidationErrors | null> {
  return of(null).pipe(delay(1000));
}

const url = 'https://api.zippopotam.us/us/';

export function westernZipValidatorFactory(http: HttpClient) {
  return (
    control: AbstractControl
  ): Observable<ValidationErrors | null> =>
    http.get<LocationDetails>(url + control.value).pipe(
      tap(r => console.log(r)),
      map(locationDetails => locationDetails.places[0].longitude),
      map(l => l < -90),
      tap(ok =>
        ok
          ? console.log('It is west enough')
          : console.log('It is not west enough')
      ),
      map(ok => (ok ? null : { westerliness: 'not enough' })),
      catchError(_e => of({ westerliness: 'Unable to verify' }))
    );
}
