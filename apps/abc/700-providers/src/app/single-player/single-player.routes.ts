import { Routes } from '@angular/router';

import { ClickComponent } from '../click/click.component';
import { ClickService } from '../click.service';

import { SinglePlayerService } from './single-player.service';

const singlePlayerRoutes: Routes = [
  {
    path: '',
    component: ClickComponent,
    providers: [
      {
        provide: ClickService,
        useClass: SinglePlayerService
      }
    ]
  }
];

export default singlePlayerRoutes;
