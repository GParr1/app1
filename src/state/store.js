import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'state/auth/reducer';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // usa localStorage

const rootReducer = combineReducers({
  auth: authReducer,
});
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // necessario per redux-persist
    }),
});
export const persistor = persistStore(store);
