import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ProductsListView from 'views/ProductLogView'
import DashboardView from 'views/DashboardView'
import ProductView from 'views/ProductView'
import { Toolbar, CssBaseline } from '@material-ui/core'
import SellView from 'views/SellView';
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
        <Root config={cozyLayoutPreset} style={{ background: 'white' }}>
            <CssBaseline />
            <Header>
                <Toolbar>
                    <SidebarTrigger >
                        <SidebarTriggerIcon />
                    </SidebarTrigger>
            Refinder
          </Toolbar>
            </Header>


            <Sidebar>

                <ul>
                    <li>Dashboard</li>
                    <li>Materials</li>
                    <li>Services</li>
                    <li>Settings</li>
                </ul>
                <CollapseBtn >
                    <CollapseIcon />
                </CollapseBtn>
            </Sidebar>
            <Content style={{ position: 'relative', zIndex: 1 }}>
                <Routes>
                    <Route path="/" element={<ProductsListView />} />
                    <Route path="/materials" element={<ProductsListView />} />
                    <Route path="/materials/:material" element={<ProductView />} />
                    <Route path="/services" element={<ProductsListView />} />
                    <Route path="/dashboard" element={<ProductsListView />} />
                    <Route path="/sell" element={<SellView />} />
                </Routes>
            </Content>
            <Footer>
                Footer
        </Footer>
        </Root>)
}

export default MarketplaceView;