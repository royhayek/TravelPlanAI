import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseAIResponse } from '../../shared/utils';
import { openAIConfig } from '../../app/api';
import { OpenAIApi } from 'openai';
import moment from 'moment';
import _ from 'lodash';

// This thunk will make a POST request to the OenAI API with the provided payload
export const fetchTravelDestinations = createAsyncThunk('travelItinerary/fetch', async (payload) => {
  const { destination, periodType, noOfDays, selectedMonth, fromDate, toDate, interests, whoIsGoing } = payload;

  // Process payload
  const byDate = _.isEqual(periodType, 'date');
  const joinedInterests = interests.join(', ');
  const duration = noOfDays || moment(toDate, 'YYYY-MM-DD').diff(moment(fromDate, 'YYYY-MM-DD'), 'days');

  // Generate response
  const openai = new OpenAIApi(openAIConfig);

  // const prompt = `Generate a personalized travel itinerary for a trip to ${destination}. The traveler is interested in ${joinedInterests}. The itinerary should include ${joinedInterests} activities and dining options (breakfast, lunch and dinner) within the activities. Please provide a detailed itinerary with daily recommendations for ${duration} days, including suggested destinations, activities, and dining options. Each day should start with breakfast and end with dinner and should have 4 activities and the 3 dining options. The itinerary should be written in english. and the output should be a JSON array and should have fthe following format: "[ [{"id": "", "place": "restaurant or place name", "address": "restaurant or activity address", "desc": "breakfast, lunch, dinner or activity description"}] ]"`;
  // Completion prompt
  const prompt = byDate
    ? `Create a JSON array for a complete personalized travel itinerary for a trip to ${destination} ` +
      `for ${duration} from ${fromDate} to ${toDate} ${whoIsGoing}. ` +
      `The traveler is interested in ${joinedInterests}. ` +
      'Each day should have 1: breakfast (always), 2: activity, 3: activity, 4: lunch (always), 5: activity, 6: activity, 7: dinner (always).' +
      'Please follow the order properly, do not skip any step' +
      'Each one having a unique ID, a descriptive name, and a real address (excluding the country name). ' +
      'The format should be: "[ [{"id": "", "place": "name", "address": "address", "desc": "activity description"}] ]"'
    : // ? `Create a JSON array for a trip to ${destination} from ${fromDate} to ${toDate} ${whoIsGoing}, focusing on "${joinedInterests}" Include at least 2 activities per day, and let the day start with breakfast, lunch at the middle and end with dinner, each with a unique ID, a descriptive name, and a real address (excluding the country name). The format should be: "[ [{"id": "", "place": "name", "address": "address", "desc": "activity description"}] ]"`
      `Create a JSON array for a trip to ${destination} for ${duration} in ${selectedMonth} ${whoIsGoing}, focusing on "${joinedInterests}" Include at least 4 activities per day, each with a unique ID, a descriptive name, and a real address (excluding the country name). The format should be: "[ [{"id": "", "place": "name", "address": "address", "desc": "activity description"}] ]"`;

  const response = await openai.createCompletion({
    model: 'gpt-3.5-turbo-instruct',
    // Set the prompt to include the destination and duration
    prompt,
    // Set the maximum tokens (if lowered the itinerary returned might be cut and can't be parsed)
    max_tokens: 3900,
    // Set the temperature to control the randomness of the generated response
    temperature: 0.4
  });

  console.debug('[fetchTravelItinerary] :: string response ', response.data.choices[0].text.trim());

  // Parse json response
  const parsedResponse = parseAIResponse(response.data.choices[0].text.trim());

  console.debug('[fetchTravelItinerary] :: parsed response ', parsedResponse);

  // Return the parsed response as the payload of the thunk
  return parsedResponse;
});
