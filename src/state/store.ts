import { configureStore, compose, combineReducers } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { useDispatch } from 'react-redux'
import loginReducer from "./slice/loginSlice";
import taskReducer from "./slice/taskSlice"
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import sessionStorage from "redux-persist/es/storage/session";
import projectReducer from "./slice/projectSlice";
import tempProjectReducer from "./slice/tempProjectSlice";
import tempTaskReducer from "./slice/tempTaskSlice";
import dashboardReducer from "./slice/dashboardSlice";
import bugsReducer from "./slice/bugsSlice";

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
}

const rootReducer = combineReducers({
  tasks: taskReducer,
  login: loginReducer,
  projects: projectReducer,
  tempProject: tempProjectReducer,
  tempTask: tempTaskReducer,
  dashboard: dashboardReducer,
  bugs: bugsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(thunk)
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
