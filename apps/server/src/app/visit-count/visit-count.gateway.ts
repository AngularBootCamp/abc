import {
  ConnectedSocket,
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class VisitCountGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server | undefined;
  visitCount = 0;

  handleConnection(@ConnectedSocket() _client: Socket): void {
    this.visitCount++;
    this.server?.emit('visitCount', this.visitCount);
  }
}
