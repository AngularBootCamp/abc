export interface Player {
  id: string;
  name: string;
}

export interface Game {
  id: string;
  name: string;
  date: string;
  location: string;
  players: string[];
}

export interface ShotOnGoal {
  id: string;
  player: string;
  game: string;
  assist: string;
  scored: boolean;
  minute: number;
}

export interface ShotOnGoalWithNames extends ShotOnGoal {
  playerName: string;
  assistName: string;
}

export type CardType = 'red' | 'yellow';

export interface Card {
  id: string;
  type: CardType;
  game: string;
  player: string;
  minute: number;
}

export interface CardWithName extends Card {
  playerName: string;
}

export interface PlayerWithStats extends Player {
  games: Game[];
  shotsOnGoal: ShotOnGoalWithNames[];
  cards: Card[];
  assists: ShotOnGoalWithNames[];
}

export interface GameWithEvents extends Game {
  shots: ShotOnGoalWithNames[];
  cards: CardWithName[];
  playerDetails: Player[];
}
