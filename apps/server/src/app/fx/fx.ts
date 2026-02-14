// Generate vaguely life-like FX demo data,
import { MessageEvent } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';

// Algorithm translated from an excellent book:
// Data Push Apps with HTML5 SSE
// Pragmatic Solutions for Real-World Clients
// By Darren Cook
// http://shop.oreilly.com/product/0636920030928.do

function deg2rad(deg: number) {
  return (deg * Math.PI) / 180;
}

function randomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class CurrencyPair {
  constructor(
    private symbol: string,
    private firstBid: number,
    private spread: number,
    private decimalPlaces: number,
    private longCycle: number,
    private shortCycle: number
  ) {}

  public generate(msSince1970: number) {
    let bid = this.firstBid;
    bid +=
      this.spread *
      100 *
      Math.sin(
        (360 / this.longCycle) *
          deg2rad((msSince1970 / 1000) % this.longCycle)
      );
    bid +=
      this.spread *
      30 *
      Math.sin(
        (360 / this.shortCycle) *
          deg2rad((msSince1970 / 1000) % this.shortCycle)
      );
    bid +=
      (randomIntInclusive(-1000, 1000) / 1000.0) * 10 * this.spread;
    const ask = bid + this.spread;

    return {
      timestamp: msSince1970,
      symbol: this.symbol,
      bid: bid.toFixed(this.decimalPlaces),
      ask: ask.toFixed(this.decimalPlaces)
    };
  }
}

// Completely made up values, these are real currency identifiers
// but the number ranges are not intended to be realistic.

const symbols = [
  new CurrencyPair('EUR/USD', 1.61, 0.0001, 5, 360, 47),
  new CurrencyPair('USD/JPY', 85.1, 0.01, 3, 341, 55),
  new CurrencyPair('AUD/GBP', 1.823, 0.0002, 5, 319, 39),
  new CurrencyPair('NZD/USD', 1.45, 0.001, 4, 290, 41)
];

export function startFxGenerator(
  ms: number
): Observable<MessageEvent> {
  return interval(ms).pipe(
    map(() => {
      const t = Date.now(); // ms since 1970
      const ix = randomIntInclusive(0, symbols.length - 1);
      return {
        data: symbols[ix].generate(t)
      };
    })
  );
}
