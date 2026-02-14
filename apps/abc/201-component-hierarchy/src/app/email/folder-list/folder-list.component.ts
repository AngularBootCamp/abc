import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FolderItemComponent } from '../folder-item/folder-item.component';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  imports: [FolderItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FolderListComponent {}
