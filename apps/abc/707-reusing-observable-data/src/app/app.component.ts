import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';

import { AsyncPipe, JsonPipe } from '@angular/common';

import { shareReplay } from 'rxjs';

import { CompanyLoader } from './company-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AsyncPipe, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly company = inject(CompanyLoader)
    .loadOneCompany()
    .pipe(shareReplay(1));

  protected readonly showAgain = signal(false);
}
