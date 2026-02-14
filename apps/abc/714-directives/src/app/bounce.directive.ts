import { Directive, OnDestroy, input, signal } from '@angular/core';

@Directive({
  selector: '[appBounce]',
  host: {
    '[style.transform]': 'transform()'
  }
})
export class BounceDirective implements OnDestroy {
  transform = signal('');

  // Note that this input is not required, because the default is
  // enough
  readonly speed = input(25);

  private n = 0;

  private readonly intervalId = window.setInterval(() => {
    this.n = this.n + 0.1;
    const rotation = Math.sin(this.n) * 5;
    this.transform.set(`rotate(${rotation}deg)`);
  }, this.speed());

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}

// As with Blink, this could be done at a greater abstraction
// from the browser interval settings.
