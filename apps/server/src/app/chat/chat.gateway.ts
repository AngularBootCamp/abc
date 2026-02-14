import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Message {
  name: string;
  contents: string;
}

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer() server: Server | undefined;
  messages: Message[] = [];

  @SubscribeMessage('chat')
  async onChat(
    @ConnectedSocket() _client: Socket,
    @MessageBody() message: Message
  ): Promise<void> {
    this.messages.push(message);
    this.server?.emit('chat', this.messages);
  }
}
