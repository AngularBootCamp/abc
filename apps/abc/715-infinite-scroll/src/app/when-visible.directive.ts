import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  output
} from '@angular/core';

@Directive({
  selector: '[appWhenVisible]'
})
export class WhenVisibleDirective implements OnInit, OnDestroy {
  private element = inject(ElementRef);

  readonly appWhenVisible = output<void>();

  private observer: IntersectionObserver | undefined;

  ngOnInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.appWhenVisible.emit();
      }
    }, {});

    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
