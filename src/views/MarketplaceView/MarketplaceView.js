import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductsListView from "views/ProductLogView";
import DashboardView from "views/DashboardView";
import ProductView from "views/ProductView";
import not_found_png from "assets/NotFound.png";

import {
  Toolbar,
  CssBaseline,
  Typography,
  Avatar,
  ListItem,
  List,
  Link,
  Container,
  ListItemAvatar,
  makeStyles,
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
import rootconfig from "./rootconfig";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import theme from "theme";
import { AuthContext } from "../../firebase/Auth";
const useStyles = makeStyles(() => ({
  header: {
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, .10)",
    backgroundColor: "#ffffff"
  },
  insetBody: {
    borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
    overflowY: "auto"
  },
  insetDrawerPaper: {
    width: "100%",
    maxWidth: 300
  },
  contentContainer: {
    flex: 1,

    height: "100%"
  },
  content: {
    maxHeight: "100%",

    flex: 1,
    overflowY: "auto"
  },
  footer: {
    height: 52,
    display: "flex",
    alignItems: "center",
    border: "none",
    padding: "0 8px"
  },
  edit: {
    backgroundColor: "rgba(0,0,0,0.04)"
  }
}));

const MarketplaceView = () => {
  const navigate = useNavigate();
  const { userData } = React.useContext(AuthContext);
  const styles = useStyles();
  return (
    <Root
      initialCollapsed={true}
      config={cozyLayoutPreset}
      // style={{ overflow: "visible" }}
    >
      {({
        headerStyles,
        sidebarStyles,
        containerStyles,
        contentStyles,
        collapsed
      }) => (
        <>
          <CssBaseline />
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
              <Typography variant="subtitle2">
                Hello, {userData?.name}
              </Typography>
            </Toolbar>
          </Header>

          <Sidebar>
            <div className={sidebarStyles.container}>
              <List>
                <ListItem button>
                  <Tooltip
                    placement="right"
                    aria-label="Dashboard"
                    title="Dashboard"
                  >
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
                  <Tooltip
                    placement="right"
                    aria-label="Materials"
                    title="Materials"
                  >
                    <ListItemAvatar>
                      <MaterialIcon />
                    </ListItemAvatar>
                  </Tooltip>
                </ListItem>
                <ListItem button>
                  <Tooltip
                    placement="right"
                    aria-label="Services"
                    title="Services"
                  >
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
                  <Tooltip
                    placement="right"
                    aria-label="Settings"
                    title="Settings"
                  >
                    <ListItemAvatar>
                      <SettingsIcon />
                    </ListItemAvatar>
                  </Tooltip>
                </ListItem>
                <ListItem button>
                  <Tooltip
                    placement="right"
                    aria-label="Settings"
                    title="Settings"
                  >
                    <ListItemAvatar>
                      <SettingsIcon />
                    </ListItemAvatar>
                  </Tooltip>
                </ListItem>
              </List>
            </div>

            <CollapseBtn className={sidebarStyles.collapseBtn}>
              <CollapseIcon />
            </CollapseBtn>
          </Sidebar>
          <Container style={{ height: "100%" }}>
            <Content style={{ height: "100%" }}>
              <ThemeProvider theme={theme}>
                <Routes>
                  <Route path="/" element={<ProductsListView />} />
                  <Route path="/materials" element={<ProductsListView />} />
                  <Route
                    path="/materials/:material"
                    element={<ProductView />}
                  />
                  <Route path="/services" element={<ProductsListView />} />
                  <Route path="/dashboard" element={<ProductsListView />} />
                  <Route path="/sell" element={<SellView />} />
                  <Route
                    path="/notfound"
                    element={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center"
                        }}
                      >
                        <img
                          style={{ width: "30%" }}
                          alt="not_found"
                          src={not_found_png}
                        />
                        <Typography variant="h2"> not found</Typography>
                      </div>
                    }
                  />
                </Routes>
              </ThemeProvider>
            </Content>
          </Container>
          {/* <Footer>Footer</Footer> */}
        </>
      )}
    </Root>
  );
};

export default MarketplaceView;
