import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Employee } from './employee-loader.service';
import { EmployeeLists } from './employees.types';

export const employeesActions = createActionGroup({
  source: 'Employees',
  events: {
    'Ack Employee': props<{ employee: Employee }>(),
    'Load Employees': emptyProps(),
    'Load Employees Success': props<{ employees: EmployeeLists }>(),
    'Load Employees Failure': props<{ error: unknown }>()
  }
});
