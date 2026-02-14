import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Spy, createSpyFromClass } from 'jest-auto-spies';
import { Observable, Subject, of, throwError } from 'rxjs';

import { AuthorLoaderService } from './author-loader.service';
import {
  authorApiActions,
  authorInitActions
} from './author.actions';
import { AuthorEffects } from './author.effects';
import { mockAuthors } from './mock.authors';

describe('AuthorEffects', () => {
  let actions$: Observable<Action>;
  let effects: AuthorEffects;
  let authorLoaderMock: Spy<AuthorLoaderService>;

  beforeEach(() => {
    actions$ = new Subject<Action>();
    authorLoaderMock = createSpyFromClass(AuthorLoaderService);

    TestBed.configureTestingModule({
      providers: [
        AuthorEffects,
        provideMockActions(() => actions$),
        { provide: AuthorLoaderService, useValue: authorLoaderMock }
      ]
    });

    effects = TestBed.inject(AuthorEffects);
  });

  describe('loadAuthors', () => {
    it('should load authors', waitForAsync(() => {
      // spy on the service call
      // this makes sure we're not testing the service, just the effect
      authorLoaderMock.load.mockReturnValue(of(mockAuthors));

      // check that the output of the effect is what we expect it to be
      effects.loadAuthors$.subscribe(a => {
        expect(a).toEqual(
          authorApiActions.loadAuthorsSuccess({
            authors: mockAuthors
          })
        );

        // check that the service was called
        expect(authorLoaderMock.load).toHaveBeenCalled();
      });

      // emit an action
      (actions$ as Subject<Action>).next(
        authorInitActions.loadAuthors()
      );
    }));

    it('should handle author loading failing', waitForAsync(() => {
      authorLoaderMock.load.mockReturnValue(throwError(() => 'oops'));
      effects.loadAuthors$.subscribe(a => {
        expect(a).toEqual(
          authorApiActions.loadAuthorsFailure({ error: 'oops' })
        );
      });
      (actions$ as Subject<Action>).next(
        authorInitActions.loadAuthors()
      );
    }));
  });
});
