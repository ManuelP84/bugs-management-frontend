import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import projectReducer from "./slice/projectSlice";

export const store = configureStore({
    reducer: {
        projects: projectReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()