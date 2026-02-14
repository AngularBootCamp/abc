import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { adjectives, proglangs, terms } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [NgFor, NgIf, ReactiveFormsModule]
})
export class AppComponent {
  protected readonly descriptorsControl: FormControl =
    new FormControl();
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
