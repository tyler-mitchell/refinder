import React from 'react'
import { NavLink, BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ProductView from "views/ProductView"
import Landing from './views/LandingPage';

import MarketplaceView from './views/MarketplaceView'


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="marketplace/*" element={<MarketplaceView />} />
        <Route path="/productview" exact element={<ProductView/>} />
      </Routes>

    </BrowserRouter>
  )
}
export default Router;
