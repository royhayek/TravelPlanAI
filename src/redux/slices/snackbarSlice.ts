import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

const snackbarSlice = createSlice({
  name: 'snackbarSlice',
  initialState: {
    show: false,
    delay: 1200,
    autohide: true,
    title: '',
    message: ''
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.show = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
    hideSnackbar: (state) => {
      state.show = false;
    }
  }
});

export const snackbarActions = snackbarSlice.actions;

export default snackbarSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _snackbar = (state: RootState) => state.snackbar;

export const selectSnackBar = createSelector(_snackbar, (data) => data);
