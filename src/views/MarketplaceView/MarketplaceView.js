import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SidebarContent from "./SidebarContent";
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
  Box,
  makeStyles,
  Tooltip
} from "@material-ui/core";
import CreateProductView from "views/CreateProductView";
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
  SidebarTriggerIcon,
  InsetContainer
} from "@mui-treasury/layout";

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
    <Box
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      overflow={"hidden"}
    >
      <Root
        initialCollapsed={true}
        initialSecondaryOpened={true}
        config={rootconfig}
        // config={cozyLayoutPreset}
        omitThemeProvider
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
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Header>
                <Toolbar>
                  <SidebarTrigger className={headerStyles.leftTrigger}>
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
                  {userData && (
                    <Typography variant="subtitle2">
                      Hello, {userData.displayName}
                    </Typography>
                  )}
                </Toolbar>
              </Header>

              <Sidebar>
                <div className={sidebarStyles.container}>
                  <SidebarContent />
                </div>

                <CollapseBtn className={sidebarStyles.collapseBtn}>
                  <CollapseIcon />
                </CollapseBtn>
              </Sidebar>

              <Content>
                <Routes>
                  <Route path="/" element={<DashboardView />} />
                  <Route path="/materials" element={<ProductsListView />} />
                  <Route
                    path="/materials/:material"
                    element={<ProductView />}
                  />
                  <Route path="/services" element={<ProductsListView />} />
                  <Route path="/dashboard" element={<DashboardView />} />
                  <Route path="/sell" element={<CreateProductView />} />
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
              </Content>

              {/* <Footer>Footer</Footer> */}
            </ThemeProvider>
          </>
        )}
      </Root>
    </Box>
  );
};

export default MarketplaceView;
