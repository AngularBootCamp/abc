import { Injectable, inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  message = inject(Socket).fromEvent('visitCount');
}
