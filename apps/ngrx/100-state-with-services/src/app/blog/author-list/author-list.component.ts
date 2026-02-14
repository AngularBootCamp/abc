import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { filter } from 'rxjs';

import { AuthorService } from '../author/author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.scss',
  imports: [MatListModule, RouterLink, AsyncPipe]
})
export class AuthorListComponent {
  readonly authors$ = inject(AuthorService).authors.pipe(
    filter(authors => !!authors.length)
  );
}
