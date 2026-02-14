export type Term = {
  definition: string;
  term: string;
};

export type ProgrammingLanguage = {
  designer: string;
  language: string;
  link: string;
  released: string;
};

export const adjectives = [
  'dark',
  'stormy',
  'eerie',
  'spooky',
  'noisy',
  'creepy',
  'windy',
  'ghostly',
  'chilly',
  'scary'
];

export const terms: Term[] = [
  {
    term: 'anatidaephobia',
    definition:
      'The fear that, somewhere, somehow, ' +
      'a duck is watching you.'
  },
  {
    term: 'aquadextrous',
    definition:
      'Possessing the ability to turn the bathtub ' +
      'faucet on and off with your toes.'
  },
  {
    term: 'malamanteau',
    definition:
      'A neologism for a portmanteau created by incorrectly ' +
      'combining a malapropism with a neologism.'
  },
  {
    term: 'refenestrate',
    definition:
      'To throw a recently-defenestrated object back ' +
      'through the window it was ejected from.'
  },
  {
    term: 'thagomizer',
    definition:
      'The distinctive arrangement of four to ten ' +
      'spikes on the tails of stegosaurid dinosaurs.'
  }
];

export const proglangs: ProgrammingLanguage[] = [
  {
    language: 'Befunge',
    designer: 'Chris Pressey',
    released: '1993',
    link: 'https://en.wikipedia.org/wiki/Befunge'
  },
  {
    language: 'INTERCAL',
    designer: 'Donald R. Woods and James M. Lyon',
    released: '1972',
    link: 'https://en.wikipedia.org/wiki/INTERCAL'
  },
  {
    language: 'LOLCODE',
    designer: 'Adam Lindsay',
    released: '2007',
    link: 'https://en.wikipedia.org/wiki/LOLCODE'
  },
  {
    language: 'Malbolge',
    designer: 'Ben Olmstead',
    released: '1998',
    link: 'https://en.wikipedia.org/wiki/Malbolge'
  },
  {
    language: 'Unlambda',
    designer: 'David Madore',
    released: '1999',
    link: 'https://en.wikipedia.org/wiki/Unlambda'
  }
];
