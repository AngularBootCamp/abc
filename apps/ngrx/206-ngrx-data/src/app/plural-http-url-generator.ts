import { Injectable, inject } from '@angular/core';
import {
  DefaultHttpUrlGenerator,
  HttpResourceUrls,
  Pluralizer
} from '@ngrx/data';

/**
 * UrlGenerator that always returns the plural version. @ngrx/data
 * assumes that actions that operate on a single entity will use a
 * singular rest call (like GET /api/employee/1), but actions that
 * operated on multiple entities will use a plural rest call (like GET
 * /api/employees). Our server uses plural for both, and this is the
 * way to achieve that.
 *
 * See the official documentation:
 * https://ngrx.io/guide/data/extension-points#replace-the-httpurlgenerator
 */
@Injectable()
export class PluralHttpUrlGenerator extends DefaultHttpUrlGenerator {
  private myPluralizer: Pluralizer;

  constructor() {
    const myPluralizer = inject(Pluralizer);

    super(myPluralizer);

    this.myPluralizer = myPluralizer;
  }

  protected override getResourceUrls(
    entityName: string,
    root: string
  ): HttpResourceUrls {
    let resourceUrls = this.knownHttpResourceUrls[entityName];
    if (!resourceUrls) {
      // The example in documentation "normalizes" by stripping the
      // leading '/', but we need the slash.
      // const nRoot = normalizeRoot(root);
      const nRoot = root;
      const url = `${nRoot}/${this.myPluralizer.pluralize(
        entityName
      )}/`.toLowerCase();
      resourceUrls = {
        entityResourceUrl: url,
        collectionResourceUrl: url
      };
      this.registerHttpResourceUrls({ [entityName]: resourceUrls });
    }
    return resourceUrls;
  }
}
