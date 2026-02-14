import { createSelector } from '@ngrx/store';

import { employeesFeature } from './employees.reducer';

const { selectLists } = employeesFeature;

// defensive copy of the data coming out of the store
// createSelector will memoize (cache) the result, meaning it will
// give the same object until the state changes
export const selectNewEmployees = createSelector(
  // notice that we don't create this selector - it's automatically
  // created by NgRx
  selectLists,
  state => [...state.newEmployees]
);

export const selectCurrentEmployees = createSelector(
  selectLists,
  state => [...state.currentEmployees]
);
