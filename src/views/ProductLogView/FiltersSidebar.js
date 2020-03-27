import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { withStyles } from "@material-ui/core";

import ListSubheader from "@material-ui/core/ListSubheader";
import { Box } from "@material-ui/core";
import { categories } from "./categories";

const PrettoSlider = withStyles({
  root: {
    color: "#292929",
    height: 8
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: "#fff",
    border: "1.3px solid rgba(0,0,0, 0.3)",
    boxShadow: "0 3px 5px -3px rgba(0,0,0,0.3)",
    marginTop: -6,
    marginLeft: -8,

    "&:focus, &:hover, &$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 6,
    opacity: 0.5,
    borderRadius: 4
  },
  rail: {
    height: 6,
    borderRadius: 4
  }
})(Slider);

const AirbnbSlider = withStyles({
  root: {
    color: "#3a8589",
    height: 3,
    padding: "13px 0"
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -12,
    marginLeft: -13,
    boxShadow: "#ebebeb 0px 2px 2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0px 2px 3px 1px"
    },
    "& .bar": {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 3
  },
  rail: {
    color: "#d8d8d8",
    opacity: 1,
    height: 3
  }
})(Slider);

const NavContent = ({ onClickItem }) => (
  <Paper
    style={{ width: "300px", position: "relative", paddingRight: "20%" }}
    elevation={0}
  >
    <Typography style={{ fontWeight: 600 }} variant="h5" gutterBottom>
      Filters
    </Typography>
    <Typography variant="subtitle1">Price</Typography>
    <Box px="3%">
      <PrettoSlider
        defaultValue={[0, 100]}
        // valueLabelDisplay="auto"
        aria-label="pretto slider"
      />
    </Box>
    <List>
      <ListSubheader>All Categories</ListSubheader>
      {categories.map(({ primaryText, icon }, i) => (
        <ListItem
          key={primaryText}
          selected={i === 0}
          button
          onClick={onClickItem}
        >
          {/* <ListItemIcon>
            <Icon>{icon}</Icon>
          </ListItemIcon> */}
          <ListItemText
            primary={primaryText}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      ))}
      <Divider style={{ margin: "12px 0" }} />
      {/* <ListItem button onClick={onClickItem}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText
          primary={"Settings & account"}
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItem> */}
    </List>
  </Paper>
);
export default NavContent;
