import { Routes } from '@angular/router';

import { authorIdRouteParam } from '../routing-parameters';

import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorComponent } from './author/author.component';

const blougRoutes: Routes = [
  {
    path: '',
    component: AuthorListComponent,
  },
  {
    path: `:${authorIdRouteParam}`,
    component: AuthorComponent,
  },
];

export default blougRoutes;
