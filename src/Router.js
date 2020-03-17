import React from 'react'
import { NavLink, BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ThemeProvider } from '@material-ui/styles';
import theme from './theme/index'

import Landing from './views/LandingPage';

import MarketplaceView from './views/MarketplaceView'
import { CssBaseline } from '@material-ui/core';


const Router = () => {
  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="marketplace/*" element={<MarketplaceView />} />
      </Routes>


    </ThemeProvider>
  )
}
export default Router;
