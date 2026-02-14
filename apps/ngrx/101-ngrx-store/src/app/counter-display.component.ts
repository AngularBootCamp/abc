import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-counter-display',
  templateUrl: './counter-display.component.html',
  styleUrl: './counter-display.component.scss',
  imports: [MatCardModule, MatButtonModule]
})
export class CounterDisplayComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) counter!: number;
  @Output() pick = new EventEmitter<number>();
}
