import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { UserProfile } from './user-profile.types';

// Local API server
// const apiUrl = '/api';

// Hosted API server
const apiUrl = 'https://api.angularbootcamp.com';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private http = inject(HttpClient);

  loadUserProfile(): Observable<UserProfile> {
    const username = 'lgraham'; // This would be retrieved from auth system
    const params = { username };

    return this.http
      .get<UserProfile[]>(apiUrl + '/authors', { params })
      .pipe(
        map(authors => {
          if (!authors.length) {
            throw new Error('not found');
          }
          return authors[0];
        })
      );
  }

  saveUserProfile(profile: UserProfile) {
    // return this.http.put(`${apiUrl}/authors/${profile.id}`, profile);
    return of(profile);
  }
}
