import { createFeature, createReducer, on } from '@ngrx/store';

import { Employee } from './employee-loader.service';
import { employeesActions } from './employees.actions';
import { EmployeeLists } from './employees.types';

export interface State {
  lists: EmployeeLists;
}

export const initialState: State = {
  lists: {
    newEmployees: [],
    currentEmployees: []
  }
};

export const employeesFeature = createFeature({
  name: 'employees',
  reducer: createReducer(
    initialState,
    on(employeesActions.loadEmployeesSuccess, (state, action) => ({
      ...state,
      lists: action.employees
    })),
    on(employeesActions.ackEmployee, (state, action) =>
      acknowledgeEmployee(state, action.employee)
    )
  )
});

function acknowledgeEmployee(
  currentState: State,
  employee: Employee
): State {
  const newEmployees = currentState.lists.newEmployees.filter(
    x => x !== employee
  );
  const currentEmployees = [
    ...currentState.lists.currentEmployees,
    employee
  ];
  return {
    ...currentState,
    lists: { newEmployees, currentEmployees }
  };
}
