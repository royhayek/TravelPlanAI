import { createAsyncThunk } from '@reduxjs/toolkit';
import { openAIConfig } from 'app/src/data/api';
import { getMonths, parseAIResponse } from 'app/src/helpers';
import { OpenAIApi } from 'openai';
import moment from 'moment';
import _ from 'lodash';

// This thunk will make a POST request to the ChatGPT API with the provided payload
export const fetchTravelItinerary = createAsyncThunk('travelItinerary/fetch', async payload => {
  const { destination, periodType, noOfDays, selectedMonth, fromDate, toDate, interests, whoIsGoing } = payload;

  console.debug('starting fetching itinerary');
  // Process payload
  const byDate = _.isEqual(periodType, 'date');
  const fromDay = moment(fromDate).format('DD');
  const toDay = moment(toDate).format('DD');
  const months = getMonths(fromDate, toDate);

  // Generate response
  const openai = new OpenAIApi(openAIConfig);
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    // Set the prompt to include the destination and duration
    prompt: byDate
      ? `Create a javascript array as a JSON string of fully descriptive travel itinerary for a trip to ${destination} from ${fromDate} to ${toDate} knowing that I am going ${whoIsGoing} and I am interested in ${interests}, and having at least 4 activities per day, each activity should have a fully descriptive name and an address. The response should be under this format: { "days" : [ {  "name" : "Day 1",  "date": "2023-09-26", "activities": [{ "name": "name of the place", "description": "what will I be doing there", "address": "address of the place" }] }] }`
      : // ? `Create a travel itinerary for a trip to ${destination} from ${fromDay} to ${toDay} of the following month(s): ${months}, with the following interests: ${joinedInterests} knowing that I am going ${withWho}`
        `Create a travel itinerary for a trip to ${destination} for ${noOfDays} days in ${selectedMonth}, with the following interests: ${interests}`,
    max_tokens: 3000,
    // Set the temperature to control the randomness of the generated response
    temperature: 0.7,
  });

  console.debug('response.data.choices[0].text.trim()', response.data.choices[0].text.trim());

  // Parse json response
  const parsedResponse = parseAIResponse(response.data.choices[0].text.trim());

  console.debug('parsedResponse', parsedResponse);

  // Return the parsed response as the payload of the thunk
  return parsedResponse;
});
