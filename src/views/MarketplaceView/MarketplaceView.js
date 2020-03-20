import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductsListView from "views/ProductLogView";
import DashboardView from "views/DashboardView";
import ProductView from "views/ProductView";
import { Toolbar, CssBaseline, Typography, Avatar, Link } from "@material-ui/core";
import SellView from "views/SellView";
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

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import theme from "theme";
import { AuthContext } from "../../firebase/Auth";
import { Navigate, useNavigate } from "react-router-dom";

const MarketplaceView = () => {
  const { userData } = React.useContext(AuthContext);
  let navigate = useNavigate();
  return (
    <Root omitThemeProvider>
      <Header>
        <Toolbar>
          <SidebarTrigger>
            <SidebarTriggerIcon />
          </SidebarTrigger>
          <Typography variant="h5" > <Link href='\' onClick={() => {
            navigate("/");
          }}> Refinder</Link> </Typography>
          <div style={{ flexGrow: 1 }} />
          <Typography variant="subtitle2">Hello, {userData?.name}</Typography>
        </Toolbar>
      </Header>

      <Sidebar>
        <ul>
          <li>Dashboard</li>
          <li>Materials</li>
          <li>Services</li>
          <li>Settings</li>
        </ul>
        <CollapseBtn>
          <CollapseIcon />
        </CollapseBtn>
      </Sidebar>
      <Content style={{ position: "relative", zIndex: 1 }}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<ProductsListView />} />
            <Route path="/materials" element={<ProductsListView />} />
            <Route path="/materials/:material" element={<ProductView />} />
            <Route path="/services" element={<ProductsListView />} />
            <Route path="/dashboard" element={<ProductsListView />} />
            <Route path="/sell" element={<SellView />} />
          </Routes>
        </ThemeProvider>
      </Content>
      <Footer>Footer</Footer>
    </Root>
  );
};

export default MarketplaceView;
