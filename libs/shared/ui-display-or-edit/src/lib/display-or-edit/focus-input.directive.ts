import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject
} from '@angular/core';

@Directive({
  selector: '[oasisFocusInput]'
})
export class FocusInputDirective implements AfterViewInit {
  private el = inject(ElementRef);

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}
