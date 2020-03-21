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
import LoginView from "./views/OnboardView/LoginView";
import SignupView from "./views/OnboardView/SignupView";
import ProductView from "./views/ProductView/ProductView.js"

const Router = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/signup" element={<SignupView />} />
        <Route path="marketplace/*" element={<MarketplaceView />} />
        <Route path="/productview" exact element={<ProductView />} />
      </Routes>
    </ThemeProvider>
  );
};
export default Router;
