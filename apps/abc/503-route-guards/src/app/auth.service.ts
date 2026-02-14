import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserHasAccessTo(_route: ActivatedRouteSnapshot) {
    // Pretend there's lots of logic here to decide if the
    // current user is allowed to access the specified route.

    // Change this from `true` to `false` to see how it affects
    // routing to 'admin'.
    return true;
  }
}
