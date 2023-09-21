import { createAsyncThunk } from '@reduxjs/toolkit';
import { openAIConfig } from 'app/src/data/api';
import { getMonths } from 'app/src/helpers';
import { OpenAIApi } from 'openai';
import moment from 'moment';
import _ from 'lodash';

// This thunk will make a POST request to the ChatGPT API with the provided payload
export const fetchTravelItinerary = createAsyncThunk('travelItinerary/fetch', async payload => {
  const { destination, periodType, noOfDays, selectedMonth, fromDate, toDate, interests } = payload;

  // Process payload
  const byDate = _.isEqual(periodType, 'date');
  const fromDay = moment(fromDate).format('DD');
  const toDay = moment(toDate).format('DD');
  const months = getMonths(fromDate, toDate);
  const joinedInterests = interests.join(', ');

  // Generate response
  const openai = new OpenAIApi(openAIConfig);
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    // Set the prompt to include the destination and duration
    prompt: byDate
      ? `Create a travel itinerary for a trip to ${destination} from ${fromDay} to ${toDay} of the following month(s): ${months}, with the following interests: ${joinedInterests}`
      : `Create a travel itinerary for a trip to ${destination} for ${noOfDays} days in ${selectedMonth}, with the following interests: ${joinedInterests}`,
    max_tokens: 300,
    // Set the temperature to control the randomness of the generated response
    temperature: 0.7,
  });
  // Return the generated response as the payload of the thunk
  return response.data.choices[0].text.trim();
});
