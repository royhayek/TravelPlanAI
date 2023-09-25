import { createAsyncThunk } from '@reduxjs/toolkit';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const GOOGLE_MAPS_API_KEY = Platform.select({
  ios: Constants.expoConfig.ios.config.googleMapsApiKey,
  android: Constants.expoConfig.android.config.googleMaps.apiKey,
});

export const fetchItineraryPlaces = createAsyncThunk('itineraryPlaces/fetch', async payload => {
  try {
    const { addresses } = payload;
    const apiKey = GOOGLE_MAPS_API_KEY;
    const fields = ['name', 'formatted_address', 'photos', 'rating', 'opening_hours', 'types'];

    // Create an array of promises for fetching data
    const fetchPromises = addresses.map(async ({ id, address }, index) => {
      const query = encodeURIComponent(address);
      const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&fields=${fields.join(',')}&key=${apiKey}`;
      const searchResultResponse = await fetch(searchUrl);
      const searchDataJson = await searchResultResponse.json();
      const searchData = searchDataJson.results[0];

      const placeId = searchData.place_id;
      const placeUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;
      const placeResponse = await fetch(placeUrl);
      const placeDataJson = await placeResponse.json();
      const placeData = placeDataJson.result;

      return { id, searchResult: searchData, placeResult: placeData }; // Return the fetched data
    });

    // Use Promise.all to wait for all promises to resolve
    const results = await Promise.all(fetchPromises);

    console.debug('[fetchItineraryPlaces] :: ', results);
    return results;
  } catch (err) {
    console.error('[fetchItineraryPlaces] :: ', err);
  }
});
