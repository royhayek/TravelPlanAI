import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@app/store';

const initialState = {
  config: {
    ads: {
      rewarded: {
        android: '',
        ios: '',
      },
    },
  },
  language: 'en',
  themeMode: 'dark',
  messagesCount: 0,
  lastSentDate: null,
  lastRewardedDate: null,
  subscriptions: [],
  ownedSubscription: null,
  deviceUuid: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setConfig: (state, action) => {
      state.config = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
    setMessagesCount: (state, action) => {
      state.messagesCount = action.payload;
    },
    setLastSentDate: (state, action) => {
      state.lastSentDate = action.payload;
    },
    setLastRewardedDate: (state, action) => {
      state.lastRewardedDate = action.payload;
    },
    setPaidSubscriptions: (state, action) => {
      state.subscriptions = action.payload;
    },
    setOwnedSubscription: (state, action) => {
      state.ownedSubscription = action.payload;
    },
    setDeviceUuid: (state, action) => {
      state.deviceUuid = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const appActions = appSlice.actions;

export default appSlice.reducer;

// Selectors
const _app = (state: RootState) => state.app;

export const getLanguage = createSelector(_app, data => data.language);
export const getThemeMode = createSelector(_app, data => data.themeMode);
export const getConfiguration = createSelector(_app, data => data.config);
export const getDeviceUuid = createSelector(_app, data => data.deviceUuid);
export const getMessagesCount = createSelector(_app, data => data.messagesCount);
export const getSubscriptions = createSelector(_app, data => data.subscriptions);
export const getOwnedSubscription = createSelector(_app, data => data.ownedSubscription);
