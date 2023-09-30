import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showToast, hideToast } from './toastSlice';
import { logQuery } from './queryLogSlice';
import { fetchTravelSummaryAndTips } from '../actions/travelSummaryAndTipsActions';
import { fetchTravelItinerary as fetchTravelDestinations } from '../actions/travelItineraryActions';
import { fetchItineraryPlaces } from '../actions/itineraryPlacesActions';
import _ from 'lodash';

const initialState = {
  loading: false,
  destinations: [],
  error: null,
};

// Define the destination slice using createSlice
export const destinationSlice = createSlice({
  name: 'destination',
  initialState,
  reducers: {
    // Reducer function for the fetchDestinationsStart action
    fetchDestinationsStart: state => {
      state.loading = true;
      state.error = null;
    },
    // Reducer function for the fetchDestinationsSuccess action
    fetchDestinationsSuccess: (state, action) => {
      state.loading = false;
      state.destinations = action.payload;
    },
    // Reducer function for the fetchDestinationsFailure action
    fetchDestinationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export the action creators
export const { fetchDestinationsStart, fetchDestinationsSuccess, fetchDestinationsFailure } = destinationSlice.actions;

// Action creator that fetches client's IP address and dispatches both submitForm and logQuery actions

// Define an async action creator to submit the form data
export const submitForm = payload => async (dispatch, getState) => {
  dispatch(fetchDestinationsStart()); // Dispatch the fetchDestinationsStart action

  // Here, you can access any global state value (Not able to get recent state change)
  const state = getState();

  // Fetch the client's IP address using an external API
  const response = await axios.get('https://api.ipify.org?format=json');
  const ipAddress = response.data.ip;

  try {
    // Make a request to the ChatGPT server with the form data
    const summaryAndTipsResponse = await dispatch(fetchTravelSummaryAndTips(payload));
    const summaryAndTipsError = summaryAndTipsResponse.error?.message;

    const itineraryResponse = await dispatch(fetchTravelDestinations(payload));
    const itineraryError = itineraryResponse.error?.message;

    const places = _.flatMap(itineraryResponse?.payload);
    console.debug('itineraryResponse in destinationSlide', places);
    const placesResponse = dispatch(fetchItineraryPlaces(places));
    const placesError = placesResponse.error?.message;

    // Dispatch logQuery action with the appropriate payload
    dispatch(logQuery({ ipAddress, payload, createdBy: 'user' }));
    // Dispatch the fetchDestinationsSuccess action with the response data
    dispatch(fetchDestinationsSuccess(response.data));

    if (!summaryAndTipsError) {
      // Dispatch the showToast action with a success message
      dispatch(showToast({ type: 'success', title: 'Success', message: 'Itinerary fetched successfully' }));
    } else if (itineraryError) {
      dispatch(showToast({ type: 'error', title: 'Error', message: summaryAndTipsError }));
    } else if (placesError) {
      dispatch(showToast({ type: 'warning', title: 'Warning', message: placesError }));
    } else {
      dispatch(showToast({ type: 'error', title: 'Error', message: itineraryError }));
    }
  } catch (error) {
    console.error('[submitForm] :: ', error.message);
    // Dispatch the fetchDestinationsFailure action with the error message
    dispatch(fetchDestinationsFailure(error.message));
    // Dispatch the showToast action with an error message
    dispatch(showToast({ type: 'error', title: 'Error', message: error.message }));
  } finally {
    // Hide the toast message after 3 seconds
    setTimeout(() => {
      dispatch(hideToast());
    }, state.toast.delay);
  }
};

// Export the destination reducer
export default destinationSlice.reducer;
