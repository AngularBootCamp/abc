import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    AsyncPipe
  ]
})
export class ChatComponent {
  private chat = inject(ChatService);

  name = new FormControl('', { nonNullable: true });
  message = new FormControl('', { nonNullable: true });
  allMessages = this.chat.messages;

  sendChat() {
    this.chat.sendChat({
      name: this.name.value,
      contents: this.message.value
    });
    this.message.reset();
  }
}
