import {
  patchState,
  signalStore,
  withMethods,
  withState
} from '@ngrx/signals';

export const ConfigStore = signalStore(
  { providedIn: 'root', protectedState: false },
  withState({ title: 'Our Blog' }),
  withMethods(store => ({
    updateTitle(title: string) {
      patchState(store, { title });
    }
  }))
);

// Necessary to inject ConfigStore as a type
export type ConfigStore = InstanceType<typeof ConfigStore>;
