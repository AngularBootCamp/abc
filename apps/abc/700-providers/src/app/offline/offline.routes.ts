import { Routes } from '@angular/router';

import { ClickService } from '../click.service';
import { ClickComponent } from '../click/click.component';

import { OfflineService } from './offline.service';

const offlineRoutes: Routes = [
  {
    path: '',
    component: ClickComponent,
    providers: [
      {
        provide: ClickService,
        useClass: OfflineService,
      },
    ],
  },
];

export default offlineRoutes;
