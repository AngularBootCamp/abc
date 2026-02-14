import { ParamMap } from '@angular/router';
import { distinctUntilChanged, filter, map, Observable } from 'rxjs';

import { authorIdRouteParam } from '../routing-parameters';

export function extractAuthorId() {
  return (source: Observable<ParamMap>) =>
    source.pipe(
      map(params => params.get(authorIdRouteParam)),
      distinctUntilChanged(),
      // https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
      filter((id): id is string => !!id),
      map(id => Number(id))
    );
}
