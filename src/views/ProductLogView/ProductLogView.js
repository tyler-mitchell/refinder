import React from "react";
import ProductList from "components/ProductsList";
import FilterSidebar from "./FiltersSidebar";
import { Grid } from "@material-ui/core";
import SearchBar from "components/SearchBar";
import MaterialMap from "components/Map";
import {
  responsiveFontSizes,
  makeStyles,
  createMuiTheme,
  Container,
  Box,
  CssBaseline,
  Toolbar,
  Drawer
} from "@material-ui/core";
import {
  Root,
  Header,
  Sidebar,
  Content,
  Footer,
  CollapseBtn,
  CollapseIcon,
  SidebarTrigger,
  SidebarTriggerIcon,
  SecondarySidebar,
  SecondarySidebarTrigger,
  SecondarySidebarTriggerIcon,
  SecondaryCollapseBtn,
  SecondaryCollapseIcon,
  ConfigGenerator,
  cozyLayoutPreset,
  standardLayoutPreset
} from "@mui-treasury/layout";
import clsx from "clsx";
const drawerWidth = 900;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,

    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    paddingTop: "5%"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  }
}));

const ProductLogView = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        spacing={3}
        style={{ paddingBottom: "30px" }}
      >
        {/* <SearchBar /> */}

        <Grid item>
          <FilterSidebar />
        </Grid>

        <Grid item md={7} xs={11}>
          <ProductList />
        </Grid>
      </Grid>
    </>
  );
};

export default ProductLogView;
