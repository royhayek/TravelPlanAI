import { createAsyncThunk } from '@reduxjs/toolkit';
import { openAIConfig } from 'app/src/data/api';
import { parseAIResponse } from 'app/src/helpers';
import { OpenAIApi } from 'openai';
import _ from 'lodash';

// This thunk will make a POST request to the ChatGPT API with the provided payload
export const fetchTravelItinerary = createAsyncThunk('travelItinerary/fetch', async payload => {
  const { destination, periodType, noOfDays, selectedMonth, fromDate, toDate, interests, whoIsGoing } = payload;
  const joinedInterests = interests.join(', ');

  // Process payload
  const byDate = _.isEqual(periodType, 'date');

  // Generate response
  const openai = new OpenAIApi(openAIConfig);
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    // Set the prompt to include the destination and duration
    prompt: byDate
      ? `Create a javascript array as a JSON string of fully descriptive travel itinerary for a trip to ${destination} from ${fromDate} to ${toDate} knowing that I am going ${whoIsGoing} and I am interested in ${joinedInterests}, and having at least 4 activities per day, the response should have a small summary about the destination and each activity should have a unique auto incremented id, a fully descriptive name, address, coordinates. The response should be under this format: { "summary": "", "days" : [ {  "name" : "Day 1",  "date": "2023-09-26", "activities": [{"id": "", "name": "name of the place", "description": "what will I be doing there", "address": "address of the place", "coordinates": { "lat": "", "long": "" } }] }] }`
      : `Create a javascript array as a JSON string of fully descriptive travel itinerary for a trip to ${destination} for ${noOfDays} in ${selectedMonth} knowing that I am going ${whoIsGoing} and I am interested in ${joinedInterests}, and having at least 4 activities per day, the response should have a small summary about the destination and each activity should have a unique auto incremented id, a fully descriptive name, address, coordinates. The response should be under this format: { "summary": "", "days" : [ {  "name" : "Day 1",  "date": "2023-09-26", "activities": [{ "id": "", "name": "name of the place", "description": "what will I be doing there", "address": "address of the place", "coordinates": { "lat": "", "long": "" } }] }] }`,
    max_tokens: 3000,
    // Set the temperature to control the randomness of the generated response
    temperature: 0.7,
  });

  console.debug('[fetchTravelItinerary] :: string response ', response.data.choices[0].text.trim());

  // Parse json response
  const parsedResponse = parseAIResponse(response.data.choices[0].text.trim());

  console.debug('[fetchTravelItinerary] :: parsed response ', parsedResponse);

  // Return the parsed response as the payload of the thunk
  return parsedResponse;
});