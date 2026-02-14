import {
  ActionReducerMap,
  createActionGroup,
  createFeature,
  createReducer,
  on,
  props
} from '@ngrx/store';

export const configActions = createActionGroup({
  source: 'Config',
  events: {
    'Update Title': props<{ title: string }>()
  }
});

export interface ConfigState {
  title: string;
}

const initialConfigState: ConfigState = {
  title: 'Our Blog'
};

export interface AppState {
  config: ConfigState;
}

const configFeature = createFeature({
  name: 'config',
  reducer: createReducer(
    initialConfigState,
    on(configActions.updateTitle, (state, action) => ({
      ...state,
      title: action.title
    }))
  )
});

export const reducers: ActionReducerMap<AppState> = {
  config: configFeature.reducer
};

// A simple, non-memoized selector for ConfigState:
// const selectConfig = (state: AppState) => state.config;

export const selectTitle = configFeature.selectTitle;

// Solution after the workshop for ngrx101
// export interface AppState {
//   title: string;
// }

// export const titleReducer = createReducer(
//   'Our Blog',
//   on(updateTitle, (_state, action) => action.title)
// );

// export const reducers: ActionReducerMap<AppState> = {
//   title: titleReducer
// };
