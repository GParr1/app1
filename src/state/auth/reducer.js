import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    accountInformation: (state, action) => {
      state.accountInformation = action.payload;
    },
    logout: (state) => {
      state.user = {};
      state.accountInformation = {};
    },
  },
});

export const { login, accountInformation, logout } = authSlice.actions;

export default authSlice.reducer;
