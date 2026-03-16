/* eslint-disable @typescript-eslint/no-deprecated, @typescript-eslint/no-restricted-imports
-- This is an example of legacy code
*/
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NgFor, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { adjectives, proglangs, terms } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [NgFor, NgIf, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly descriptorsControl: FormControl = new FormControl();
  protected showDetails = false;
  protected terms = terms;
  protected adjectives: string[] = [];
  protected programmingLanguages = proglangs;

  constructor() {
    this.descriptorsControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(x => (this.adjectives = adjectives.slice(0, x)));
    this.descriptorsControl.setValue(4);
  }
}
