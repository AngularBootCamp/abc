import { Component, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ScoreComponent } from './score.component';

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      imports: [ScoreComponent]
    }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
  });

  describe('score text', () => {
    let valueDisplayEl: HTMLElement;

    beforeEach(() => {
      // find the DOM elements we expect to change
      const valueDisplayDe = fixture.debugElement.query(
        By.css('.value-display')
      );
      valueDisplayEl = valueDisplayDe.nativeElement;
    });

    it('should start with no score', () => {
      expect(valueDisplayEl.textContent).toEqual('');
    });

    it('should display a score that is set', async () => {
      fixture.componentRef.setInput('value', 50);
      fixture.detectChanges(); // triggers data-binding

      expect(valueDisplayEl.textContent).toContain('50');
    });
  });

  describe('notify button', () => {
    let buttonDe: DebugElement;

    beforeEach(() => {
      buttonDe = fixture.debugElement.query(By.css('button'));
    });

    it('should result in a notify event when clicked', () => {
      fixture.componentRef.setInput('value', 42);
      fixture.detectChanges(); // triggers data-binding

      let notification = '';
      component.notify.subscribe(
        (event: string) => (notification = event)
      );
      buttonDe.triggerEventHandler('click', null);
      expect(notification).toBe('Your score was 42');
      // Note: this works because EventEmitters are synchronous by default
    });
  });
});

describe('ScoreComponent inside a test host', () => {
  @Component({
    template: `
      <app-show-score [value]="score" (notify)="onNotify($event)" />
    `,
    imports: [ScoreComponent]
  })
  class TestHostComponent {
    score = 42;
    notification: string | undefined;

    onNotify(event: string) {
      this.notification = event;
    }
  }

  let scoreComponentDe: DebugElement;
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    scoreComponentDe = fixture.debugElement.query(
      By.css('app-show-score')
    );
  });

  describe('score text', () => {
    let valueDisplayEl: HTMLElement;

    beforeEach(() => {
      // find the DOM elements we expect to change
      const valueDisplayDe = scoreComponentDe.query(
        By.css('.value-display')
      );
      valueDisplayEl = valueDisplayDe.nativeElement;
    });

    it('should start with no score', () => {
      expect(valueDisplayEl.textContent).toEqual('');
    });

    it('should display score after first detection', () => {
      fixture.detectChanges(); // triggers data-binding
      expect(valueDisplayEl.textContent).toBe('42');
    });

    it('should display a different score', () => {
      testHost.score = 50;
      fixture.detectChanges();
      expect(valueDisplayEl.textContent).toContain('50');
    });
  });

  describe('notify button', () => {
    let buttonDe: DebugElement;

    beforeEach(() => {
      buttonDe = scoreComponentDe.query(By.css('button'));
    });

    it('should result in a notify event when clicked', () => {
      fixture.detectChanges();
      buttonDe.triggerEventHandler('click', null);
      expect(testHost.notification).toBe('Your score was 42');
    });
  });
});

// All of this raises questions: why are we testing this? What are we
// testing? Should we expect Angular bindings to work, or should we test
// them? The answer likely depends upon company policies and what kind
// of Angular code is being tested.
