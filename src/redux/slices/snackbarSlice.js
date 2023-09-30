import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbarSlice',
  initialState: {
    show: false,
    delay: 1200,
    autohide: true,
    title: '',
    message: '',
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.show = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
    hideSnackbar: state => {
      state.show = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
