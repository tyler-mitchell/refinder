import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ProductsListView from 'views/ProductsListView'
import DashboardView from 'views/DashboardView'
import {
    Root,
    Header,
    Sidebar,
    Content,
    Footer,
    CollapseBtn,
    CollapseIcon,
    SidebarTrigger,
    cozyLayoutPreset,
    SidebarTriggerIcon
} from "@mui-treasury/layout";


const MarketplaceView = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductsListView />} />
        </Routes>)
}

export default MarketplaceView;