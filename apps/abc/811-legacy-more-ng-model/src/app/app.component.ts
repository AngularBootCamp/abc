import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface IColor {
  code: string;
  display: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FormsModule]
})
export class AppComponent {
  protected version = 'Beta';
  protected person = '';
  protected favoriteColor = 'Blue';
  protected show = false;

  protected colors: IColor[] = [
    {
      code: 'Blue',
      display: 'Blue ish'
    },
    {
      code: 'Red',
      display: 'Red ish'
    },
    {
      code: 'Green',
      display: 'Green ish'
    }
  ];
}
