import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable, Observer, map, share, tap } from 'rxjs';

import { jsonRequestHeaders } from './httpUtils';

interface Person {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AsyncPipe]
})
export class AppComponent {
  showData = true;
  showExtraTime = true;

  name = inject(HttpClient)
    .get<Person>('https://swapi.dev/api/people/11/', {
      headers: jsonRequestHeaders
    })
    .pipe(
      tap(person => console.log(person)),
      map(person => person.name)
    );

  // Example of making an Observable:
  time = new Observable<number>((observer: Observer<number>) => {
    console.log('Subscribing to time');
    const handle = window.setInterval(() => {
      console.log('emitting time');
      observer.next(new Date().getTime() % 10000);
    }, 100);
    // stop interval on unsubscribe
    return () => {
      console.log('Unsubscribing to time');
      clearInterval(handle);
    };
  }).pipe(share()); // Try it without share().
}
