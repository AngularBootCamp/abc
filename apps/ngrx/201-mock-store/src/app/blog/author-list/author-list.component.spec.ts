import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom } from 'rxjs';

import { mockAuthors } from '../author/mock.authors';

import { AuthorListComponent } from './author-list.component';

describe('AuthorListComponent', () => {
  let component: AuthorListComponent;
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorListComponent,
        provideMockStore({
          initialState: {
            author: {
              authors: mockAuthors
            }
          }
        })
      ]
    });

    component = TestBed.inject(AuthorListComponent);
    mockStore = TestBed.inject(MockStore);
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
      mockStore.setState({
        author: {
          authors: []
        }
      });

      const observerSpy = subscribeSpyTo(component.authors$);

      expect(observerSpy.receivedNext()).toEqual(false);
    });
  });
});
