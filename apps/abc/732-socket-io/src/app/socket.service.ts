import { Service, inject } from '@angular/core';

import { Socket } from 'ngx-socket-io';

@Service()
export class SocketService {
  public readonly message = inject(Socket).fromEvent('visitCount');
}
