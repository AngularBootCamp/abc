import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { shareReplay } from 'rxjs';

import { CompanyLoader } from './company-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AsyncPipe, JsonPipe]
})
export class AppComponent {
  protected readonly company = inject(CompanyLoader)
    .loadOneCompany()
    .pipe(shareReplay(1));

  protected readonly showAgain = signal(false);
}
