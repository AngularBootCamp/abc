import { Component, Input } from '@angular/core';

@Component({
  selector: 'abc-copyright',
  templateUrl: './copyright.component.html'
})
export class CopyrightComponent {
  @Input({ required: true }) year!: string;
}
