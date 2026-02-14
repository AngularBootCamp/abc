import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AuthorComponent } from './author.component';

describe('AuthorComponent', () => {
  let component: AuthorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorComponent, provideMockStore({})],
      imports: [RouterTestingModule]
    });

    component = TestBed.inject(AuthorComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
