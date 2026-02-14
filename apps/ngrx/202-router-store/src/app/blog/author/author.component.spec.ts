import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  Params,
  convertToParamMap
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom, of } from 'rxjs';

import { mockArticles } from '../article/mock.articles';

import { AuthorComponent } from './author.component';
import { mockAuthors } from './mock.authors';

describe('AuthorComponent', () => {
  let component: AuthorComponent;
  let params: Params;

  beforeEach(() => {
    params = {
      authorId: '2'
    };

    TestBed.configureTestingModule({
      providers: [
        AuthorComponent,
        provideMockStore({
          initialState: {
            article: {
              articles: mockArticles
            },
            author: {
              authors: mockAuthors
            }
          }
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap(params))
          }
        }
      ],
      imports: [RouterTestingModule]
    });

    component = TestBed.inject(AuthorComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('articles$', () => {
    it('should return the articles', async () => {
      const result = await firstValueFrom(component.articles$);

      expect(result).toEqual(mockArticles);
    });
  });

  describe('author$', () => {
    it('should return the author w/ a match', async () => {
      const result = await firstValueFrom(component.author$);

      expect(result).toEqual(mockAuthors[1]);
    });

    it('should handle no match', async () => {
      params['authorId'] = '999';

      const result = await firstValueFrom(component.author$);

      expect(result).toBeUndefined();
    });
  });
});
