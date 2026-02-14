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

export interface Card {
  id: string;
  type: 'red' | 'yellow';
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

export interface GameModalTransfer {
  id: string;
  players: Player[];
}

export interface PlayerStatsByGame {
  location: string;
  date: string;
  shots: number;
  goals: number;
  assists: number;
  redCard: boolean;
  yellowCard: boolean;
}
