import React from "react";
import { useNavigate } from "react-router-dom";

import DashboardIcon from "@material-ui/icons/DashboardRounded";
import MaterialIcon from "@material-ui/icons/Grain";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import ServicesIcon from "@material-ui/icons/Build";
import SellIcon from "@material-ui/icons/MonetizationOn";
import {
  ListItem,
  List,
  Link,
  ListItemAvatar,
  Tooltip
} from "@material-ui/core";

const navigationLinks = [
  { primaryText: "Dashboard", icon: <DashboardIcon />, path: "" },
  { primaryText: "Dashboard", icon: <SellIcon />, path: "sell" },
  { primaryText: "Materials", icon: <MaterialIcon />, path: "materials" }
];
const SidebarContent = () => {
  const navigate = useNavigate();
  return (
    <List>
      {navigationLinks.map(({ icon, path }) => (
        <ListItem
          button
          onClick={() => {
            navigate(path);
          }}
        >
          <ListItemAvatar>{icon}</ListItemAvatar>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarContent;
