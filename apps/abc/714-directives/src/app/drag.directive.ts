import { Directive, signal } from '@angular/core';

@Directive({
  selector: '[appMakeDraggable]',
  host: {
    style: `
      position: relative;
      padding: 0.5rem;
      color: var(--abc-on-secondary-color);
      background-color: var(--abc-secondary-color);
      cursor: pointer;
    `,
    '[style.left.px]': 'x()',
    '[style.top.px]': 'y()',
    '(mousedown)': 'mousedown($event)'
  }
})
export class DragDirective {
  x = signal(0);
  y = signal(0);

  private startX = 0;
  private startY = 0;
  private mm = this.mousemove.bind(this);
  private mu = this.mouseup.bind(this);

  mousedown(event: MouseEvent) {
    event.preventDefault();
    this.startX = event.pageX - this.x();
    this.startY = event.pageY - this.y();
    // watch the whole window
    document.addEventListener('mousemove', this.mm);
    document.addEventListener('mouseup', this.mu);
  }

  mousemove(event: MouseEvent) {
    this.x.set(event.pageX - this.startX);
    this.y.set(event.pageY - this.startY);
  }

  mouseup() {
    document.removeEventListener('mousemove', this.mm);
    document.removeEventListener('mouseup', this.mu);
  }
}
