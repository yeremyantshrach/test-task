import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { leaderboardsApi } from '@/store/services/leaderboardsApi';
import { postsApi } from '@/store/services/postsApi';
import { appSlice } from '@/store/appSlice';

const rootReducer = combineReducers({
  [leaderboardsApi.reducerPath]: leaderboardsApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [appSlice.name]: appSlice.reducer,
});

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([leaderboardsApi.middleware, postsApi.middleware]),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
