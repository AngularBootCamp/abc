import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-collection-panel',
  templateUrl: './collection-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionPanelComponent {}

@Component({
  selector:
    'app-collection-panel-header, app-collection-panel-content, app-collection-panel-footer',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionPanelChildrenComponent {}
