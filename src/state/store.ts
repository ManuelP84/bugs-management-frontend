<<<<<<< HEAD
import { configureStore, compose, combineReducers } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
=======
import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slice/projectSlice";
>>>>>>> b7983241d3120be81d646e027e1afed2c8628024
import { useDispatch } from 'react-redux'
import loginReducer from "./slice/loginSlice";
import taskReducer from "./slice/taskSlice"
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import sessionStorage from "redux-persist/es/storage/session";


const persistConfig = {
  key: 'root',
  storage: sessionStorage,
}

const rootReducer = combineReducers({
  tasks: taskReducer,
  login: loginReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
<<<<<<< HEAD
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(thunk)
=======
    reducer: {
        tasks: taskReducer,
        projects: projectReducer,
        login: loginReducer
    }
>>>>>>> b7983241d3120be81d646e027e1afed2c8628024
})

export const persistor = persistStore(store)



declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
