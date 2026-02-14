import { InjectionToken } from '@angular/core';

export type Constellation = {
  name: string;
  iauAbbreviation: string;
  meaning: string;
  description: string;
  origin: string;
  brightestStar: string;
  link: string;
  imageLink: string;
};

export type ConstellationLoaderConfig = {
  endpoint: string;
};

export const CONSTELLATION_LOADER_CONFIG =
  new InjectionToken<ConstellationLoaderConfig>(
    'ConstellationLoader configuration'
  );
