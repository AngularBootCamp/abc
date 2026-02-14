import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { Spy, createSpyFromClass } from 'jest-auto-spies';
import { Subject, firstValueFrom, of } from 'rxjs';

import { ConfigService } from '../../config.service';
import { mockArticles } from '../article/mock.articles';
import { AuthorService } from '../author/author.service';

import { ArticleListComponent } from './article-list.component';
import { ArticleService } from './article.service';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let configSvc: Spy<ConfigService>;
  let articleSvc: Spy<ArticleService>;
  let authorSvc: Spy<AuthorService>;
  let currentAuthorId: Subject<number | undefined>;

  beforeEach(() => {
    configSvc = createSpyFromClass(ConfigService, {
      observablePropsToSpyOn: ['title']
    });
    configSvc.title.nextWith('Blog Title');

    authorSvc = createSpyFromClass(AuthorService, {
      observablePropsToSpyOn: ['currentAuthorId']
    });
    currentAuthorId = authorSvc.currentAuthorId.returnSubject();

    articleSvc = createSpyFromClass(ArticleService, {
      observablePropsToSpyOn: ['currentArticleId']
    });
    articleSvc.currentArticleId.nextWith(2);

    TestBed.configureTestingModule({
      providers: [
        ArticleListComponent,
        { provide: ConfigService, useValue: configSvc },
        { provide: ArticleService, useValue: articleSvc },
        { provide: AuthorService, useValue: authorSvc }
      ],
      imports: [RouterTestingModule]
    });

    component = TestBed.inject(ArticleListComponent);
  });

  describe('getArticlesByAuthor', () => {
    beforeEach(() => {
      articleSvc.getArticlesByAuthor.mockReturnValue(
        of([mockArticles[0], mockArticles[1]])
      );
    });

    it('should return the articles', async () => {
      const result = await firstValueFrom(
        component.getArticlesByAuthor(1)
      );

      expect(result).toEqual([mockArticles[0], mockArticles[1]]);
    });
  });

  describe('title', () => {
    it('should get the title', async () => {
      const result = await firstValueFrom(component.title);

      expect(result).toEqual('Blog Title');
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
    it('should get the articles', async () => {
      currentAuthorId.next(2);
      articleSvc.getArticlesByAuthor.mockReturnValue(
        of([mockArticles[2]])
      );

      const result = await firstValueFrom(component.articles);

      expect(result).toEqual([mockArticles[2]]);
      expect(articleSvc.getArticlesByAuthor).toHaveBeenCalledWith(2);
    });
  });
});
