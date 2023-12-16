import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDestinations = createAsyncThunk('destionation/fetch', async (payload) => {
  try {
    const response = await axios.get('http://localhost:4000/api/destination/list', {
      headers: {
        'x-auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDIxNDUyNjMsImlkIjoiNjU3MzViNGZiMzQ1M2VjN2Q3NWY2NGU4IiwiaWF0IjoxNzAyMDU4ODYzfQ.aMHh2PSBAFf3lt0AJLDMfP7rDwKhhTO2s9OUp69_xks'
      }
    });

    console.debug('[fetchDestinations] :: results ', response.data);
    console.debug('response.data', response.data);
    return response.data;
  } catch (err) {
    console.error('[fetchDestinations] :: ', err);
  }
});
