import { createSlice } from '@reduxjs/toolkit';
import { deleteErrorAndMergeState, deleteErrorAndSetState } from 'state/stateUtils';

const initialState = {
  user: null,
  accountInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => deleteErrorAndMergeState('user')(state, action),
    accountInformation: (state, action) => deleteErrorAndSetState('accountInfo')(state, action),
    logout: () => initialState,
  },
});

export const { login, accountInformation, logout } = authSlice.actions;

export default authSlice.reducer;
