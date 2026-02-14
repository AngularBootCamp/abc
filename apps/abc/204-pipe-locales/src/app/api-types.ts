export interface Price {
  amount: number;
  currency?: string;
}

export interface ClassSession {
  location: string;
  date: Date;
  price: Price;
  locale?: string;
}
