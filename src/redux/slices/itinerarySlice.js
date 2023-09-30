import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { fetchTravelDestinations } from '../actions/travelItineraryActions';
import { fetchTravelSummaryAndTips } from '../actions/travelSummaryAndTipsActions';
import { fetchItineraryPlaces } from '../actions/itineraryPlacesActions';
import { showSnackbar, hideSnackbar } from './snackbarSlice';
import { logQuery } from './queryLogSlice';
import { clearPlaces } from './placesSlice';
import { clearDestinations } from './destinationsSlice';

const initialState = {
  isLoading: false,
  itinerary: null,
  error: null,
};

// Define the destination slice using createSlice
export const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    // Reducer function for the fetchItineraryStart action
    fetchItineraryStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    // Reducer function for the fetchItinerarySuccess action
    fetchItinerarySuccess: (state, action) => {
      state.isLoading = false;
      state.itinerary = action.payload;
    },
    // Reducer function for the fetchItineraryFailure action
    fetchItineraryFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Export the action creators
export const { fetchItineraryStart, fetchItinerarySuccess, fetchItineraryFailure } = itinerarySlice.actions;

// Action creator that fetches client's IP address and dispatches both submitForm and logQuery actions

// Define an async action creator to submit the form data
export const submitForm = payload => async (dispatch, getState) => {
  // Clear saved itinerary in redux
  dispatch(clearDestinations());
  dispatch(clearPlaces());
  dispatch(fetchItineraryStart());

  // Here, you can access any global state value (Not able to get recent state change)
  const state = getState();

  // Fetch the client's IP address using an external API
  const response = await axios.get('https://api.ipify.org?format=json');
  const ipAddress = response.data.ip;

  try {
    // Make a request to the OpenAI server with the form data
    const itineraryResponse = await dispatch(fetchTravelDestinations(payload));
    const itineraryError = itineraryResponse.error?.message;

    const summaryAndTipsResponse = await dispatch(fetchTravelSummaryAndTips(payload));
    const summaryAndTipsError = summaryAndTipsResponse.error?.message;

    const places = _.flatMap(itineraryResponse?.payload);
    const placesResponse = dispatch(fetchItineraryPlaces(places));
    const placesError = placesResponse.error?.message;

    // Dispatch logQuery action with the appropriate payload
    dispatch(logQuery({ ipAddress, payload, createdBy: 'user' }));
    // Dispatch the fetchItinerarySuccess action with the response data
    dispatch(fetchItinerarySuccess(response.data));

    if (itineraryError) {
      // Dispatch the showSnackbar action with a success message
      dispatch(showSnackbar({ type: 'error', title: 'Error', message: itineraryError }));
    } else if (itineraryError) {
      dispatch(showSnackbar({ type: 'error', title: 'Error', message: summaryAndTipsError }));
    } else if (placesError) {
      dispatch(showSnackbar({ type: 'error', title: 'Error', message: placesError }));
    }
  } catch (error) {
    console.error('[submitForm] :: ', error.message);
    // Dispatch the fetchItineraryFailure action with the error message
    dispatch(fetchItineraryFailure(error.message));
    // Dispatch the showSnackbar action with an error message
    dispatch(showSnackbar({ type: 'error', title: 'Error', message: error.message }));
  } finally {
    // Hide the snackbar message after 3 seconds
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, state.toast.delay);
  }
};

// Export the destination reducer
export default itinerarySlice.reducer;
