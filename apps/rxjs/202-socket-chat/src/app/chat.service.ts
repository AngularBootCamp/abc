import { Injectable, inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { Message } from './types';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = inject(Socket);

  messages = this.socket.fromEvent<Message[], 'chat'>('chat');

  sendChat(message: Message) {
    this.socket.emit('chat', message, (x: unknown) =>
      console.log({ x })
    );
  }
}
