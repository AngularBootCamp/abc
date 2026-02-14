import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { ClickComponent } from '../click/click.component';
import { ClickService } from '../click.service';

import { MultiPlayerService } from './multi-player.service';

const config: SocketIoConfig = {
  url: 'http://localhost:8085',
  options: {}
};

const multiplayerRoutes: Routes = [
  {
    path: '',
    component: ClickComponent,
    providers: [
      importProvidersFrom(SocketIoModule.forRoot(config)),
      {
        provide: ClickService,
        useClass: MultiPlayerService
      }
    ]
  }
];

export default multiplayerRoutes;
