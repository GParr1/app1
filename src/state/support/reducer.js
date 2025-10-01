import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.support = action.payload;
    },
  },
});

export const { setLoading } = supportSlice.actions;

export default supportSlice.reducer;
