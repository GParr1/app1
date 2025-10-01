import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accountInformation: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    accountInformation: (state, action) => {
      state.accountInformation = action.payload;
    },
    logout: () => initialState,
  },
});

export const { login, accountInformation, logout } = authSlice.actions;

export default authSlice.reducer;
