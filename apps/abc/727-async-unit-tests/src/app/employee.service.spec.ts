import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import {
  fakeAsync,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { Employee } from './employee';
import { EmployeeService } from './employee.service';

// Local API server
// const apiUrl = '/api';

// Hosted API server
const apiUrl = 'https://api.angularbootcamp.com';

describe('Employee Service', () => {
  let httpTestingController: HttpTestingController;
  let service: EmployeeService;
  let mockEmployees: Partial<Employee>[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(EmployeeService);

    mockEmployees = [
      {
        firstName: 'Sara'
      },
      {
        firstName: 'Joe'
      },
      {
        firstName: 'Bob'
      }
    ];
  });

  describe('getFilteredList', () => {
    // FLAKY TEST / FALSE POSITIVE!!! This test sometimes passes and sometimes fails
    // because the incorrect assertion in the subscribe only gets executed
    // if the overall test run is long enough.
    // If you change the xit to it, the test will probably fail.
    // If you change the xit to fit, the test will probably pass.
    xit('should return a list (false positive)(the wrong way)', () => {
      // Arrange

      // Act
      const result = service.getFilteredList('foo');

      // Assert
      result.subscribe(list => {
        // This line should fail, but it won't happen if the test
        // completes before the async call is done!
        expect(list).toEqual(['Bob', 'Joe', 'Sara']);
      });
      const req = httpTestingController.expectOne(
        apiUrl + '/employees?q=foo&_limit=20'
      );
      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toBeNull();
      expect(req.request.responseType).toEqual('json');
      req.flush(mockEmployees);
      httpTestingController.verify();
    });

    // Wrapping the test in Angular's waitForAsync function ensures that the
    // expectation in the subscribe gets executed in the scope of the test.
    // If you change the data in the expected array, the test will fail as expected.
    it('should handle the happy case (by waiting)', waitForAsync(() => {
      service.getFilteredList('foo').subscribe(list => {
        expect(list).toEqual(mockEmployees);
        // uncomment this to prove that the test completes
        // expect(list).toBeUndefined();
      });

      const req = httpTestingController.expectOne(
        apiUrl + '/employees?q=foo&_limit=20'
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toBeNull();
      expect(req.request.responseType).toEqual('json');

      req.flush(mockEmployees);

      httpTestingController.verify();
    }));

    // Using promises and async/await is another way to get correct
    // behavior
    it('should handle the happy case (promises)', async () => {
      const result = firstValueFrom(service.getFilteredList('foo'));

      const req = httpTestingController.expectOne(
        apiUrl + '/employees?q=foo&_limit=20'
      );
      req.flush(mockEmployees);
      // need to flush _before_ the await
      expect(await result).toEqual(mockEmployees);
      // uncomment this to prove that the test completes
      // expect(await result).toBeUndefined();
      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toBeNull();
      expect(req.request.responseType).toEqual('json');
      httpTestingController.verify();
    });
  });

  describe('getDelayedList', () => {
    // FLAKY TEST / FALSE POSITIVE!!! This test sometimes passes and sometimes fails
    // because the incorrect assertion in the subscribe only gets executed
    // if the overall test run is long enough.
    // If you change the xit to it, the test will probably fail.
    // If you change the xit to fit, the test will probably pass.
    xit('should return a delayed list (false positive)(the wrong way)', () => {
      service.getDelayedList().subscribe(list => {
        // This line should fail, but it won't happen if the test
        // completes before the async call is done!
        expect(list).toEqual(['Bob', 'Joe', 'foo']);
      });

      const req = httpTestingController.expectOne(
        apiUrl + '/employees'
      );

      expect(req.request.method).toEqual('GET');

      req.flush(mockEmployees);

      httpTestingController.verify();
    });

    // Wrapping the test in Angular's waitForAsync function ensures that the
    // expectation in the subscribe gets executed in the scope of the test.
    // If you change the data in the expected array, the test will fail as expected.
    it('should return a delayed list (the correct-but-slow way)', waitForAsync(() => {
      console.time('using waitForAsync');
      service.getDelayedList().subscribe(list => {
        console.timeEnd('using waitForAsync');
        expect(list).toEqual(['Bob', 'Joe', 'Sara']);
      });

      const req = httpTestingController.expectOne(
        apiUrl + '/employees'
      );

      expect(req.request.method).toEqual('GET');

      req.flush(mockEmployees);

      httpTestingController.verify();
    }));

    it('should return a delayed list (the right way)', fakeAsync(() => {
      console.time('using fakeAsync');
      service.getDelayedList().subscribe(list => {
        console.timeEnd('using fakeAsync');
        expect(list).toEqual(['Bob', 'Joe', 'Sara']);
      });

      const req = httpTestingController.expectOne(
        apiUrl + '/employees'
      );

      expect(req.request.method).toEqual('GET');

      req.flush(mockEmployees);
      tick(2000);

      httpTestingController.verify();
    }));

    it('should return a delayed list (the correct-but-slow way w/ promises)', async () => {
      console.time('using promises');
      const result = firstValueFrom(service.getDelayedList());

      const req = httpTestingController.expectOne(
        apiUrl + '/employees'
      );
      req.flush(mockEmployees);
      // need to flush _before_ the await
      expect(await result).toEqual(['Bob', 'Joe', 'Sara']);
      console.timeEnd('using promises');
      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toBeNull();
      expect(req.request.responseType).toEqual('json');
      httpTestingController.verify();
    });

    it('should return a delayed list (the correct way w/ promises)', fakeAsync(async () => {
      console.time('using promises and fakeAsync');
      const result = firstValueFrom(service.getDelayedList());

      const req = httpTestingController.expectOne(
        apiUrl + '/employees'
      );
      req.flush(mockEmployees);
      tick(2000);
      // need to flush _before_ the await
      expect(await result).toEqual(['Bob', 'Joe', 'Sara']);
      console.timeEnd('using promises and fakeAsync');
      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toBeNull();
      expect(req.request.responseType).toEqual('json');
      httpTestingController.verify();
    }));
  });
});
