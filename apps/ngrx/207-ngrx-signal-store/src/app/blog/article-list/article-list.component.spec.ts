import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Spy, createSpyFromClass } from 'jest-auto-spies';
import { firstValueFrom, ReplaySubject, Subject } from 'rxjs';

import { ConfigStore } from '../../config.store';
import { selectCurrentAuthorId } from '../../router.selectors';
import { ArticleStore } from '../article/article.store';
import { mockArticles } from '../article/mock.articles';
import { AuthorService } from '../author/author.service';

import { ArticleListComponent } from './article-list.component';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let configStore: Spy<ConfigStore>;
  let articleStore: Spy<ArticleStore>;
  let authorSvc: AuthorService;
  let currentAuthorId: Subject<number>;

  beforeEach(() => {
    configStore = createSpyFromClass(ConfigStore);
    configStore.title = signal('Blog Title') as any;

    authorSvc = createSpyFromClass(AuthorService);
    currentAuthorId = new ReplaySubject(2);
    authorSvc.currentAuthorId = currentAuthorId;

    articleStore = createSpyFromClass(ArticleStore);

    TestBed.configureTestingModule({
      providers: [
        ArticleListComponent,
        provideMockStore({}),
        { provide: ConfigStore, useValue: configStore },
        { provide: ArticleStore, useValue: articleStore },
        { provide: AuthorService, useValue: authorSvc }
      ],
      imports: [RouterTestingModule]
    });

    component = TestBed.inject(ArticleListComponent);
    const mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(selectCurrentAuthorId, 2);
  });

  describe('title', () => {
    it('should get the title', () => {
      expect(component.title()).toEqual('Blog Title');
    });
  });

  describe('authorId', () => {
    it('should get the authorId on a matching authorId', async () => {
      currentAuthorId.next(2);

      const result = await firstValueFrom(component.authorId);

      expect(result).toEqual(2);
    });

    it('should handle a missing authorId', () => {
      const observerSpy = subscribeSpyTo(component.authorId);

      expect(observerSpy.receivedNext()).toEqual(false);
    });
  });

  describe('articles', () => {
    it('should get the articles', () => {
      currentAuthorId.next(2);
      articleStore.entities = signal([mockArticles[2]]) as any;

      const result = component.articles();

      expect(result).toEqual([mockArticles[2]]);
    });
  });
});
