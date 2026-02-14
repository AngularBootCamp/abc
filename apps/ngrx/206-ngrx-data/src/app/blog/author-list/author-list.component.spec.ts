import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { Spy, createSpyFromClass } from 'jest-auto-spies';
import { Subject, firstValueFrom } from 'rxjs';

import { AuthorService } from '../author/author.service';
import { mockAuthors } from '../author/mock.authors';
import { Author } from '../types';

import { AuthorListComponent } from './author-list.component';

describe('AuthorListComponent', () => {
  let component: AuthorListComponent;
  let authorSvc: Spy<AuthorService>;
  let authors: Subject<Author[]>;

  beforeEach(() => {
    authorSvc = createSpyFromClass(AuthorService, {
      observablePropsToSpyOn: ['authors']
    });
    authorSvc.authors.nextWith(mockAuthors);
    authors = authorSvc.authors.returnSubject();

    TestBed.configureTestingModule({
      providers: [
        AuthorListComponent,
        { provide: AuthorService, useValue: authorSvc }
      ]
    });

    component = TestBed.inject(AuthorListComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('authors$', () => {
    it('should handle authors', async () => {
      const result = await firstValueFrom(component.authors$);

      expect(result).toBe(mockAuthors);
    });

    it('should handle empty authors', async () => {
      authors.next([]);

      const observerSpy = subscribeSpyTo(component.authors$);

      expect(observerSpy.receivedNext()).toEqual(false);
    });
  });
});
