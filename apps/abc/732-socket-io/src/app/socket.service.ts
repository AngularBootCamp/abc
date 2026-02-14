import { Injectable, inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public readonly message = inject(Socket).fromEvent('visitCount');
}
