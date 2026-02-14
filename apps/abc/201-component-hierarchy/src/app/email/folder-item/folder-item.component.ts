import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-folder-item',
  templateUrl: './folder-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FolderItemComponent {}
