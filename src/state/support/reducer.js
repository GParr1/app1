import { createSlice } from '@reduxjs/toolkit';
import { deleteErrorAndSetState } from 'state/stateUtils';

const initialState = {
  loading: false,
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    matches: (state, action) => deleteErrorAndSetState('matches')(state, action),
  },
});

export const { matches } = supportSlice.actions;

export default supportSlice.reducer;
