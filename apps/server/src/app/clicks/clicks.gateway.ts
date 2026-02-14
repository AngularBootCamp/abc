import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ClicksGateway {
  @WebSocketServer() server: Server | undefined;
  numClicks = 0;

  async handleConnection(): Promise<void> {
    this.server?.emit('count', this.numClicks);
  }

  @SubscribeMessage('increment')
  async onIncrement(
    @ConnectedSocket() _client: Socket
  ): Promise<void> {
    this.numClicks++;
    this.server?.emit('count', this.numClicks);
  }
}
