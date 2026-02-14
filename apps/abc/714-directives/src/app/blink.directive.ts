import {
  Directive,
  OnDestroy,
  OnInit,
  effect,
  input,
  numberAttribute,
  signal
} from '@angular/core';
import { Subscription, interval, map } from 'rxjs';

@Directive({
  selector: '[appBlink]',
  host: {
    '[style.visibility]': 'viz()'
  }
})
export class BlinkDirective implements OnDestroy, OnInit {
  viz = signal('visible');

  readonly speed = input(500, { transform: numberAttribute });

  private intervalSubscription: Subscription | undefined;

  constructor() {
    effect(() => {
      this.stop();
      this.start(this.speed());
    });
  }

  ngOnInit() {
    if (!this.intervalSubscription) {
      this.start(500);
    }
  }

  start(ms: number) {
    this.intervalSubscription = interval(ms)
      .pipe(
        map(() => (this.viz() === 'visible' ? 'hidden' : 'visible'))
      )
      .subscribe(visibility => this.viz.set(visibility));
  }

  stop() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = undefined;
    }
  }

  ngOnDestroy() {
    this.stop();
  }
}
