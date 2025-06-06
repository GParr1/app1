import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/auth/reducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
