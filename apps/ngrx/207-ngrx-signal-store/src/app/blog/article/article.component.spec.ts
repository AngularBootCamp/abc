import { signal, WritableSignal } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Spy, createSpyFromClass } from 'jest-auto-spies';

import { AuthorService } from '../author/author.service';
import { Article } from '../types';

import { ArticleComponent } from './article.component';
import { ArticleStore } from './article.store';
import { mockArticles } from './mock.articles';

describe('ArticleComponent', () => {
  let fixture: ComponentFixture<ArticleComponent>;
  let component: ArticleComponent;
  let router: Router;
  let authorSvc: Spy<AuthorService>;
  let articleStore: Spy<ArticleStore>;
  let currentArticle: WritableSignal<Article | undefined | null>;

  beforeEach(() => {
    authorSvc = createSpyFromClass(AuthorService, {
      observablePropsToSpyOn: ['currentAuthorId']
    });
    authorSvc.currentAuthorId.nextWith(1);

    currentArticle = signal(undefined);
    articleStore = createSpyFromClass(ArticleStore);
    articleStore.currentArticle = currentArticle as any;

    TestBed.configureTestingModule({
      providers: [
        ArticleComponent,
        { provide: AuthorService, useValue: authorSvc },
        { provide: ArticleStore, useValue: articleStore }
      ],
      imports: [RouterTestingModule]
    });

    fixture = TestBed.createComponent(ArticleComponent);
    fixture.detectChanges();

    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
  });

  describe('article', () => {
    it('should handle undefined article (no query param)', fakeAsync(() => {
      currentArticle.set(undefined);

      const result = component.article();
      tick();

      expect(result).toBeUndefined();

      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.title.value).toBeNull();
      expect(component.body.value).toBeNull();
    }));

    it('should handle null article (invalid query param)', fakeAsync(() => {
      currentArticle.set(null);
      fixture.detectChanges();

      const result = component.article();
      tick();

      expect(result).toBeUndefined();

      expect(router.navigate).toHaveBeenCalled();
      expect(component.title.value).toBeNull();
      expect(component.body.value).toBeNull();
    }));

    it('should handle a matched article and author', fakeAsync(() => {
      currentArticle.set(mockArticles[1]);
      fixture.detectChanges();

      const result = component.article();
      tick();

      expect(result).toEqual(mockArticles[1]);

      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.title.value).toBe('title2');
      expect(component.body.value).toBe('body2');
    }));

    it('should handle a mismatched article and author', fakeAsync(() => {
      currentArticle.set(mockArticles[2]);
      fixture.detectChanges();

      const result = component.article();
      tick();

      expect(result).toBeUndefined();

      expect(router.navigate).toHaveBeenCalled();
      expect(component.title.value).toBeNull();
      expect(component.body.value).toBeNull();
    }));
  });
});
