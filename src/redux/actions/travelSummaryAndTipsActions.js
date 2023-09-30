import { createAsyncThunk } from '@reduxjs/toolkit';
import { openAIConfig } from 'app/src/data/api';
import { parseAIResponse } from 'app/src/helpers';
import { OpenAIApi } from 'openai';

// This thunk will make a POST request to the OenAI API with the provided payload
export const fetchTravelSummaryAndTips = createAsyncThunk('travelSummaryAndTips/fetch', async payload => {
  const { destination } = payload;

  // Generate response
  const openai = new OpenAIApi(openAIConfig);

  // Completion prompt
  const prompt = `Provide a ${destination} short trip summary and a few tips (separated by \n not line break). the output should be a parsable JSON object as follow: { "summary": "", "tips": "" }`;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    // Set the prompt to include the destination and duration
    prompt,
    // Set the maximum tokens (if lowered the itinerary returned might be cut and can't be parsed)
    max_tokens: 1500,
    // Set the temperature to control the randomness of the generated response
    temperature: 0.7,
  });

  console.debug('[fetchTravelSummaryAndTips] :: string response ', response.data.choices[0].text.trim());

  // Parse json response
  const parsedResponse = parseAIResponse(response.data.choices[0].text.trim());

  console.debug('[fetchTravelSummaryAndTips] :: parsed response ', parsedResponse);

  // Return the parsed response as the payload of the thunk
  return parsedResponse;
});
