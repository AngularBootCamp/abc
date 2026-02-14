import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  template: `
    <h2>Hello {{ name | async }}!</h2>
    <p>I am a sample component.</p>
  `,
  imports: [AsyncPipe]
})
export class NameComponent {
  name = inject(ActivatedRoute).paramMap.pipe(
    map(params => params.get('name') as string)
  );
}
