import React from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Router from "./Router";
import CssBaseline from '@material-ui/core/CssBaseline';


import {
  Root,
  contentBasedLayoutPreset,
  cozyLayoutPreset,
} from "@mui-treasury/layout";







function App() {
  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
