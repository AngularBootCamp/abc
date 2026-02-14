import { Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth.guard';
import { BigFormComponent } from './big-form.component';
import { ForbiddenComponent } from './forbidden.component';
import { FormDeactivateGuard } from './form-deactive.guard';
import { HomeComponent } from './home.component';
import { NameComponent } from './name.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'hello', component: NameComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bigform',
    component: BigFormComponent,
    canDeactivate: [FormDeactivateGuard]
  }
];
