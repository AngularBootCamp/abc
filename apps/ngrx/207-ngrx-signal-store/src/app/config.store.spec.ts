import { TestBed } from '@angular/core/testing';
import { getState } from '@ngrx/signals';

import { ConfigStore } from './config.store';

describe('ConfigStore', () => {
  let store: ConfigStore;

  beforeEach(() => {
    store = TestBed.inject(ConfigStore);
  });

  it('should have the initial value', () => {
    expect(getState(store)).toEqual({ title: 'Our Blog' });
  });

  describe('updateTitle', () => {
    it('should update the state', () => {
      // Arrange
      const newTitle = 'new title';

      // Act
      store.updateTitle(newTitle);

      // Assert
      expect(store.title()).toBe(newTitle);
    });
  });
});
