import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Router from "./Router";
import store from "./store";
import { Provider } from "react-redux";
import {
  Root,
  contentBasedLayoutPreset,
  cozyLayoutPreset
} from "@mui-treasury/layout";
import AuthProvider from "./firebase/Auth";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </Provider>
  );
}

export default App;
