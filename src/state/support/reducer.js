import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    matches: (state, action) => {
      state.support = action.payload;
    },
  },
});

export const { matches } = supportSlice.actions;

export default supportSlice.reducer;
