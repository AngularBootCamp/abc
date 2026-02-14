import { Component } from '@angular/core';

@Component({
  selector: 'app-credits',
  // prettier-ignore
  template: `
    <p>
      Data is adapted from the
      <a
        href="https://en.wikipedia.org/wiki/IAU_designated_constellations"
        target="_blank"
      >
        IAU Designated Constellations
      </a>
      Wikipedia article.
    </p>

    <p>
      Constellation diagrams are courtesy of the
      <a
        href="https://www.iau.org/public/themes/constellations/"
        target="_blank"
      >
        IAU
      </a>
      and
      <a href="http://www.skyandtelescope.com/" target="_blank">
        Sky & Telescope
      </a>
      magazine (Roger Sinnott & Rick Fienberg).
    </p>

    <p>
      Constellation diagrams are hosted on
      <a href="https://commons.wikimedia.org/" target="_blank">
        Wikimedia Commons</a>, 
      and are released under the
      <a
        href="https://creativecommons.org/licenses/by/4.0/"
        target="_blank"
      >
      Creative Commons Attribution 4.0 International license</a>.      
    </p>
  `
})
export default class CreditsComponent {}
