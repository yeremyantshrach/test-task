import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/configureStore';

export enum AppRegions {
  EU = 'eu',
  NA = 'na',
  AP = 'ap',
  KR = 'kr',
  LATAM = 'latam',
  BR = 'br',
}

export type AppState = {
  region: AppRegions;
};

export const initialState: AppState = {
  region: AppRegions.EU,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRegion: (state, action: PayloadAction<AppRegions>) => {
      state.region = action.payload;
    },
  },
});

export const { setRegion } = appSlice.actions;

export const selectAppState = (state: RootState) => state.app;

export const selectAppRegion = createSelector([selectAppState], (app) => app.region);
