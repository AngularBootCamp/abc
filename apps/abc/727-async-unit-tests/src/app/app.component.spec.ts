import { TestBed } from '@angular/core/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jest-auto-spies';
import { of, take } from 'rxjs';

import { AppComponent } from './app.component';
import { EmployeeService } from './employee.service';
import { employees } from './test-employees';

describe('App Component', () => {
  let appComponent: AppComponent;
  let employeeService: Spy<EmployeeService>;

  beforeEach(() => {
    employeeService = createSpyFromClass(EmployeeService);
  });

  describe('filtered team list (manual asynchronous testing with fakeAsync)', () => {
    beforeEach(() => {
      employeeService.getFilteredList.mockReturnValue(of(employees));

      TestBed.configureTestingModule({
        providers: [
          AppComponent,
          {
            provide: EmployeeService,
            useValue: employeeService
          }
        ]
      });

      appComponent = TestBed.inject(AppComponent);
    });

    it('should respond to user typing after 250 ms', fakeAsync(() => {
      const getFilteredList = employeeService.getFilteredList;
      appComponent.filteredTeam
        .pipe(take(1))
        .subscribe(team => expect(team).toEqual(employees));

      appComponent.nameFilter.setValue('Henry');
      expect(getFilteredList).not.toHaveBeenCalled();
      tick(249);
      expect(getFilteredList).not.toHaveBeenCalled();
      tick(1);
      expect(getFilteredList).toHaveBeenCalledTimes(1);
    }));

    it('should only make one call, 250ms after last typing', fakeAsync(() => {
      const getFilteredList = employeeService.getFilteredList;
      appComponent.filteredTeam
        .pipe(take(1))
        .subscribe(team => expect(team).toEqual(employees));

      appComponent.nameFilter.setValue('Henry');
      expect(getFilteredList).not.toHaveBeenCalled();
      tick(249);
      expect(getFilteredList).not.toHaveBeenCalled();
      appComponent.nameFilter.setValue('Bob');
      tick(249);
      expect(getFilteredList).not.toHaveBeenCalled();
      tick(1);
      expect(getFilteredList).toHaveBeenCalledTimes(1);
      expect(getFilteredList).toHaveBeenCalledWith('Bob');
    }));
  });
});
