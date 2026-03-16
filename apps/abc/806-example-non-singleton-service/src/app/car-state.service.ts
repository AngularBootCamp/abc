/* eslint-disable @angular-eslint/use-injectable-provided-in
-- Services can be provided in different injectors to illustrate hierchical DI
*/

/* eslint-disable no-param-reassign
-- Several utility functions accept and then update a state object in-place
*/

// Here is the essential shape of the state of this example
// system, including the "business rules".

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CarState {
  public nAxles = 0;
  public wheelQtys: number[] = [];
  public ok = true;
  public message = '';
}

function calculateValidity(state: CarState) {
  state.ok = true;
  state.message = '';

  if (state.nAxles === 0) {
    state.ok = false;
    state.message = 'must have at least one axle';
    return;
  }

  const totalWheels = state.wheelQtys.reduce((prev, q) => prev + q, 0);
  if (totalWheels === 0) {
    state.ok = false;
    state.message = 'must have at least one wheel';
    return;
  }

  if (state.nAxles * 2 !== totalWheels) {
    state.ok = false;
    state.message = 'total wheels must be 2x total axles';
    return;
  }

  const oddWheels = state.wheelQtys.reduce((prev, q) => prev + (q % 2), 0);
  if (oddWheels !== 0) {
    state.ok = false;
    state.message = 'all wheels must be used in pairs';
    return;
  }
}

export const wheelTypes = [
  'Wide Slicks',
  'Cheap Trailer',
  'Skinny',
  'Mars Rover',
  'Stone',
];

@Injectable()
export class CarStateService {
  public state: BehaviorSubject<CarState>;

  constructor() {
    const state = new CarState();
    state.nAxles = 0;
    state.wheelQtys = Array(wheelTypes.length).fill(0);
    calculateValidity(state);
    this.state = new BehaviorSubject<CarState>(state);
  }

  public changeAxles(delta: number) {
    this.updateState(s => (s.nAxles = Math.max(s.nAxles + delta, 0)));
  }

  public changeWheelQty(i: number, delta: number) {
    this.updateState(
      s => (s.wheelQtys[i] = Math.max(s.wheelQtys[i] + delta, 0)),
    );
  }

  private updateState(f: (x: CarState) => void) {
    const newState: CarState = { ...this.state.getValue() };
    f(newState);
    calculateValidity(newState);
    this.state.next(newState);
  }
}
