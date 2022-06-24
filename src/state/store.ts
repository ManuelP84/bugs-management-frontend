import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import loginReducer from "./slice/loginSlice";
import taskReducer from "./slice/taskSlice"

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        login: loginReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
