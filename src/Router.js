import React from "react";
import {
  NavLink,
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Redirect
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme/index";
import not_found_png from "assets/NotFound.png";
import Landing from "./views/LandingPage";
import Container from "@material-ui/core/Container";
import MarketplaceView from "./views/MarketplaceView";
import { CssBaseline } from "@material-ui/core";
import OnboardView from "./views/OnboardView/OnboardView";
import ProductView from "./views/ProductView/ProductView.js";

const Router = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboard" element={<OnboardView />} />
        <Route path="marketplace/*" element={<MarketplaceView />} />
        <Route path="/productview" exact element={<ProductView />} />
        <Redirect from="/*/*" to="/marketplace/notfound" />
        {/* <Route path="*">
         
        </Route> */}
      </Routes>
    </ThemeProvider>
  );
};
export default Router;
