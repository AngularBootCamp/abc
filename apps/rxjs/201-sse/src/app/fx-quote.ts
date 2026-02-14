export interface FxQuote {
  timestamp: number;
  symbol: string;
  bid: string;
  ask: string;
}

export const placeholderQuote = {
  timestamp: 0,
  symbol: '-',
  bid: '',
  ask: ''
};
