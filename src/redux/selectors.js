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

// ------------- Snackbar Selectors ------------- //
export const snackbarState = state => state.snackbar;

export const selectSnackBar = createSelector(snackbarState, data => data);

// ------------- Itinerary Selectors ------------- //
export const itineraryState = state => state.itinerary;

export const selectItinerary = createSelector(itineraryState, data => data);

// ------------- Itinerary Destinations Selectors ------------- //
export const destinationsState = state => state.destinations;

export const selectDestinations = createSelector(destinationsState, data => data);

// ------------- Itinerary Places Selectors ------------- //
export const placesState = state => state.places;

export const selectPlaces = createSelector(placesState, data => data);
