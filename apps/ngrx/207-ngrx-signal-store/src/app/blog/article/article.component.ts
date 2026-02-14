import {
  Component,
  computed,
  effect,
  inject,
  Signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

import { DisplayOrEditComponent } from '@class-materials/shared/ui-display-or-edit';

import { articleIdQueryParam } from '../../routing-parameters';
import { AuthorService } from '../author/author.service';
import { Article } from '../types';

import { ArticleStore } from './article.store';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  imports: [DisplayOrEditComponent, MatCardModule]
})
export class ArticleComponent {
  private readonly articleStore = inject(ArticleStore);
  article: Signal<Article | undefined | null>;
  title = new FormControl();
  body = new FormControl();

  constructor() {
    const router = inject(Router);
    const authorService = inject(AuthorService);

    const authorIdSignal = toSignal(
      authorService.currentAuthorId.pipe(
        filter((authorId): authorId is number => !!authorId)
      )
    );
    effect(() => {
      const article = this.articleStore.currentArticle();
      const authorId = authorIdSignal();
      if (
        // undefined means no query param, which is valid
        article !== undefined &&
        // null means invalid query param
        // authorIds not matching means inconsistent state
        // in either case, clear the query param
        (article === null || authorId !== article.authorId)
      ) {
        // The timeout avoids a NG0600 error that would otherwise
        // be in the console. Without the timeout, the navigation
        // causes a re-execution of the currentArticle computed
        // signal as a side effect of itself. The timeout creates a
        // separation that avoids the error.
        setTimeout(() => {
          void router.navigate([], {
            queryParams: { [articleIdQueryParam]: undefined },
            queryParamsHandling: 'merge'
          });
        });
      }
    });

    this.article = computed(() => {
      const article = this.articleStore.currentArticle();
      const authorId = authorIdSignal();
      // discard the article if the article is from the wrong author
      return authorId === article?.authorId ? article : undefined;
    });

    effect(() => {
      const article = this.article();
      if (article) {
        this.title.setValue(article.title);
        this.body.setValue(article.body);
      }
    });
  }

  delete(article: Article) {
    this.articleStore.deleteArticle(article);
  }

  setTitle(article: Article) {
    this.articleStore.updateArticle({
      ...article,
      title: this.title.value
    });
  }

  setBody(article: Article) {
    this.articleStore.updateArticle({
      ...article,
      body: this.body.value
    });
  }
}
