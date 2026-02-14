import { TestBed } from '@angular/core/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jest-auto-spies';
import { of, take } from 'rxjs';

import { AppComponent } from './app.component';
import { EmployeeService } from './employee.service';
import { employees } from './test-data';

describe('App Component', () => {
  let appComponent: AppComponent;
  let employeeService: Spy<EmployeeService>;

  beforeEach(() => {
    employeeService = createSpyFromClass(EmployeeService);
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

  describe('filtered team list (manual asynchronous testing with fakeAsync)', () => {
    it('should respond to user typing after 250 ms', fakeAsync(() => {
      appComponent.filteredTeam
        .pipe(take(1))
        .subscribe(team => expect(team).toEqual(employees));

      appComponent.nameFilter.setValue('Henry');
      expect(employeeService.getFilteredList).not.toHaveBeenCalled();
      tick(249);
      expect(employeeService.getFilteredList).not.toHaveBeenCalled();
      tick(1);
      expect(employeeService.getFilteredList).toHaveBeenCalledTimes(
        1
      );
    }));

    it('should only make one call, 250ms after last typing', fakeAsync(() => {
      appComponent.filteredTeam
        .pipe(take(1))
        .subscribe(team => expect(team).toEqual(employees));

      appComponent.nameFilter.setValue('Henry');
      expect(employeeService.getFilteredList).not.toHaveBeenCalled();
      tick(249);
      expect(employeeService.getFilteredList).not.toHaveBeenCalled();
      appComponent.nameFilter.setValue('Bob');
      tick(249);
      expect(employeeService.getFilteredList).not.toHaveBeenCalled();
      tick(1);
      expect(employeeService.getFilteredList).toHaveBeenCalledTimes(
        1
      );
      expect(employeeService.getFilteredList.mock.calls[0]).toEqual([
        'Bob'
      ]);
    }));
  });
});
