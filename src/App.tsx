import { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesSite from './auxTypePlsDeleteMe/routes'
import { persistor, store} from "./state/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RoutesSite />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
