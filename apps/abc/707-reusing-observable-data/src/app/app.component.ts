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
  company = inject(CompanyLoader)
    .loadOneCompany()
    .pipe(shareReplay(1));

  showAgain = signal(false);
}
