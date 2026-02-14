import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { createSpyFromClass } from 'jest-auto-spies';
import { firstValueFrom } from 'rxjs';

import { mockArticles } from '../article/mock.articles';
import { ArticleService } from '../article-list/article.service';

import { AuthorComponent } from './author.component';

describe('AuthorComponent', () => {
  let component: AuthorComponent;

  beforeEach(() => {
    const articleSvc = createSpyFromClass(ArticleService, {
      observablePropsToSpyOn: ['articles']
    });
    articleSvc.articles.nextWith(mockArticles);

    TestBed.configureTestingModule({
      providers: [
        AuthorComponent,
        provideMockStore({}),
        { provide: ArticleService, useValue: articleSvc }
      ]
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
});
