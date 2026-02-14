import { Routes } from '@angular/router';

import { authorIdRouteParam } from '../routing-parameters';

import { AuthorComponent } from './author/author.component';
import { AuthorListComponent } from './author-list/author-list.component';

const blougRoutes: Routes = [
  {
    path: '',
    component: AuthorListComponent
  },
  {
    path: `:${authorIdRouteParam}`,
    component: AuthorComponent
  }
];

export default blougRoutes;
