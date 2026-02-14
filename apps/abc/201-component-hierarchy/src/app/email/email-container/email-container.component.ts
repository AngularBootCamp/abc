import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FolderListComponent } from '../folder-list/folder-list.component';
import { MessageDisplayComponent } from '../message-display/message-display.component';

@Component({
  selector: 'app-email-container',
  templateUrl: './email-container.component.html',
  imports: [FolderListComponent, MessageDisplayComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class EmailContainerComponent {}
