import React from "react";
import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  avatar: {
    width: 100,
    height: 100,
    margin: "auto"
  },
  name: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: "bold"
  },
  settingHeader: {
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.08)"
    }
  },
  settingHead: {
    textTransform: "uppercase",
    color: "rgba(0,0,0,0.34)",
    fontWeight: "bold",
    fontSize: 13,
    "& + *": {
      color: "rgba(0,0,0,0.34)",
      fontSize: 28
    }
  },
  settingLabel: {
    fontSize: 13
  },
  settingIcon: {
    padding: 6,
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0,0.04)",
    width: 32,
    height: 32
  },
  blue: {
    color: "rgb(0, 153, 255)",
    background: "none"
  }
}));
