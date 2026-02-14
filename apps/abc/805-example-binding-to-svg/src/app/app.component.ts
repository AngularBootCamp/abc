import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  viewChild
} from '@angular/core';
import * as d3 from 'd3';

import { GraphService, Person, Relationship } from './graph.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly cdRef = inject(ChangeDetectorRef);

  private readonly graphService = inject(GraphService);

  private readonly svgElement =
    viewChild.required<ElementRef>('svgEle');

  protected readonly peopleNodes = this.graphService.people;

  protected readonly relationshipNodesForRendering = computed(
    () =>
      this.graphService.relationships() as {
        source: Person;
        target: Person;
      }[]
  );

  private simulationEffectRef = effect(() => {
    const svgEl = this.svgElement().nativeElement;
    const peopleNodes = this.graphService.people();
    const relationshipNodes = this.graphService.relationships();

    if (!svgEl && peopleNodes.length && relationshipNodes.length) {
      return;
    }

    d3.forceSimulation<Person, Relationship>(peopleNodes)
      .force('charge', d3.forceManyBody().strength(-30))
      .force('center', d3.forceCenter(500 / 2, 500 / 2))
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .force(
        'center',
        d3.forceCenter(
          // parentNode needed for Firefox
          (svgEl.clientWidth || svgEl.parentNode.clientWidth) / 2,
          (svgEl.clientHeight || svgEl.parentNode.clientHeight) / 2
        )
      )
      // Really low values for alpha min and decay result in a
      // long-running force graph, good for ambient motion during
      // presentation.
      .alphaMin(0.0001)
      .alphaDecay(0.0005)
      // Tell Angular to update the view based on changes in the
      // simulation. This could also be handled elsewhere (with a
      // setInterval, for example) for greater control over how often
      // the view is updated.
      .on('tick', () => this.cdRef.markForCheck())
      .force(
        'link',
        d3
          .forceLink(relationshipNodes)
          // Associate links with nodes via display name.
          .id(node => (node as Person).displayName)
          .distance(0)
          .strength(0.5)
      );

    // The simulation only needs to be initialized once.
    this.simulationEffectRef.destroy();
  });
}
