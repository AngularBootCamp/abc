import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import {
  NonNullableFormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

import { userProfileActions } from './user-profile.actions';
import { selectUserProfile } from './user-profile.selectors';
import { UserProfile } from './user-profile.types';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  imports: [ReactiveFormsModule, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UserProfileComponent {
  private readonly store = inject(Store);

  protected readonly profileForm = inject(
    NonNullableFormBuilder
  ).group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required]
  });

  protected readonly userProfile = this.store
    .select(selectUserProfile)
    .pipe(
      tap(p => {
        this.profileForm.patchValue(p || {}, { emitEvent: false });
        this.profileForm.reset(this.profileForm.value); // resets pristine flag
      })
    );

  protected saveUser(userProfile: UserProfile) {
    const profile: UserProfile = {
      ...userProfile,
      ...this.profileForm.value
    };
    this.store.dispatch(
      userProfileActions.saveUserProfile({ profile })
    );
  }
}
