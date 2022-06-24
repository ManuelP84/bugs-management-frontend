import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch