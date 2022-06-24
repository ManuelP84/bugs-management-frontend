import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import taskReducer from "./slice/taskSlice"

export const store = configureStore({
    reducer: {
        tasls: taskReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()