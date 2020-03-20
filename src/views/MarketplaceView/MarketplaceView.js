import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductsListView from "views/ProductLogView";
import DashboardView from "views/DashboardView";
import ProductView from "views/ProductView";

import {
  Toolbar,
  CssBaseline,
  Typography,
  Avatar,
  ListItem,
  List,
  Link,
  ListItemAvatar,
  Tooltip
} from "@material-ui/core";
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
import DashboardIcon from "@material-ui/icons/DashboardRounded";
import MaterialIcon from "@material-ui/icons/Grain";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import ServicesIcon from "@material-ui/icons/Build";
import SellIcon from "@material-ui/icons/MonetizationOn";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import theme from "theme";
import { AuthContext } from "../../firebase/Auth";

const MarketplaceView = () => {
  const navigate = useNavigate();
  const { userData } = React.useContext(AuthContext);
  return (
    <Root
      omitThemeProvider
      config={cozyLayoutPreset}
      style={{ overflow: "visible" }}
    >
      <Header>
        <Toolbar>
          <SidebarTrigger>
            <SidebarTriggerIcon />
          </SidebarTrigger>
          <Link
            underline="none"
            color="textPrimary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
            variant="h5"
          >
            Refinder
          </Link>
          <div style={{ flexGrow: 1 }} />
          <Typography variant="subtitle2">Hello, {userData?.name}</Typography>
        </Toolbar>
      </Header>

      <Sidebar>
        <List>
          <ListItem button>
            <Tooltip placement="right" aria-label="Dashboard" title="Dashboard">
              <ListItemAvatar>
                <DashboardIcon />
              </ListItemAvatar>
            </Tooltip>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              navigate("");
            }}
          >
            <Tooltip placement="right" aria-label="Materials" title="Materials">
              <ListItemAvatar>
                <MaterialIcon />
              </ListItemAvatar>
            </Tooltip>
          </ListItem>
          <ListItem button>
            <Tooltip placement="right" aria-label="Services" title="Services">
              <ListItemAvatar>
                <ServicesIcon />
              </ListItemAvatar>
            </Tooltip>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              navigate("sell");
            }}
          >
            <Tooltip placement="right" aria-label="Services" title="Sell">
              <ListItemAvatar>
                <SellIcon />
              </ListItemAvatar>
            </Tooltip>
          </ListItem>
          <ListItem button>
            <Tooltip placement="right" aria-label="Settings" title="Settings">
              <ListItemAvatar>
                <SettingsIcon />
              </ListItemAvatar>
            </Tooltip>
          </ListItem>
          <ListItem button>
            <Tooltip placement="right" aria-label="Settings" title="Settings">
              <ListItemAvatar>
                <SettingsIcon />
              </ListItemAvatar>
            </Tooltip>
          </ListItem>
        </List>

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
