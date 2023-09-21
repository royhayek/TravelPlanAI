import { createSelector } from '@reduxjs/toolkit';

// ------------- App Selectors ------------- //
export const appState = state => state.app;

export const getLanguage = createSelector(appState, data => data.language);
export const getThemeMode = createSelector(appState, data => data.themeMode);
export const getConfiguration = createSelector(appState, data => data.config);
export const getDeviceUuid = createSelector(appState, data => data.deviceUuid);
export const getMessagesCount = createSelector(appState, data => data.messagesCount);
export const getSubscriptions = createSelector(appState, data => data.subscriptions);
export const getOwnedSubscription = createSelector(appState, data => data.ownedSubscription);

// ------------- Chat Selectors ------------- //
export const itineraryState = state => state.travelItinerary;

export const selectItinerary = createSelector(itineraryState, data => data);
