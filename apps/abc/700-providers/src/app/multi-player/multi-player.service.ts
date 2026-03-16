/* eslint-disable @angular-eslint/use-injectable-provided-in
-- Services can be provided in different injectors to illustrate hierchical DI
*/
import { Injectable, inject } from '@angular/core';

import { shareReplay } from 'rxjs';

import { Socket } from 'ngx-socket-io';

import { ClickService } from '../click.service';

@Injectable()
export class MultiPlayerService implements ClickService {
  private readonly socket = inject(Socket);

  public readonly clickCount = this.socket
    .fromEvent<number, 'count'>('count')
    .pipe(shareReplay({ refCount: true, bufferSize: 1 }));

  constructor() {
    console.log('Multi-Player Service Activated');
  }

  public async increment() {
    this.socket.emit('increment');
  }
}
