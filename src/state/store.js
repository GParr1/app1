import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/auth/reducer";
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export const dispatch = useDispatch();