import { createAsyncThunk } from '@reduxjs/toolkit';
import { openAIConfig } from 'app/src/data/api';
import { parseAIResponse } from 'app/src/helpers';
import { OpenAIApi } from 'openai';
import _ from 'lodash';

// This thunk will make a POST request to the OenAI API with the provided payload
export const fetchTravelDestinations = createAsyncThunk('travelItinerary/fetch', async payload => {
  const { destination, periodType, noOfDays, selectedMonth, fromDate, toDate, interests, whoIsGoing } = payload;
  const joinedInterests = interests.join(', ');

  // Process payload
  const byDate = _.isEqual(periodType, 'date');

  // Generate response
  const openai = new OpenAIApi(openAIConfig);

  // Completion prompt
  const prompt = byDate
    ? `Create a JSON array for a trip to ${destination} from ${fromDate} to ${toDate} ${whoIsGoing}, focusing on "${joinedInterests}" Include at least 4 activities per day, each with a unique ID, a descriptive name, and a real address (excluding the country name). The format should be: "[ [{"id": "", "place": "name", "address": "address", "desc": "activity description"}] ]"`
    : `Create a JSON array for a trip to ${destination} for ${noOfDays} in ${selectedMonth} ${whoIsGoing}, focusing on "${joinedInterests}" Include at least 4 activities per day, each with a unique ID, a descriptive name, and a real address (excluding the country name). The format should be: "[ [{"id": "", "place": "name", "address": "address", "desc": "activity description"}] ]"`;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    // Set the prompt to include the destination and duration
    prompt,
    // Set the maximum tokens (if lowered the itinerary returned might be cut and can't be parsed)
    max_tokens: 2000,
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
