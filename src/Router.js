import React from "react";
import {
  NavLink,
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from "react-router-dom";

import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme/index";

import Landing from "./views/LandingPage";

import MarketplaceView from "./views/MarketplaceView";
import { CssBaseline } from "@material-ui/core";
import OnboardView from "./views/OnboardView/OnboardView";

const Router = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboard" element={<OnboardView />} />
        <Route path="marketplace/*" element={<MarketplaceView />} />
      </Routes>
    </ThemeProvider>
  );
};
export default Router;
