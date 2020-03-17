import React from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Router from "./Router";
import store from './store';
import { Provider } from 'react-redux';
import {
  Root,
  contentBasedLayoutPreset,
  cozyLayoutPreset,
} from "@mui-treasury/layout";





function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>

  );
}

export default App;
