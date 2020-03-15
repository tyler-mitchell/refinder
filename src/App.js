import React from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Router from "./Router";


import {
  Root,
  contentBasedLayoutPreset,
} from "@mui-treasury/layout";







function App() {
  return (
    <Root config={contentBasedLayoutPreset}>
      <Router />
    </Root>
  );
}

export default App;
