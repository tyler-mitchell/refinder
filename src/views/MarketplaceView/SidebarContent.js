import React from "react";
import { useNavigate } from "react-router-dom";

import DashboardIcon from "@material-ui/icons/DashboardRounded";
import MaterialIcon from "@material-ui/icons/Terrain";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import ServicesIcon from "@material-ui/icons/Build";
import SellIcon from "@material-ui/icons/LocalAtm";
import MessagesIcon from "@material-ui/icons/Textsms";
import {
  List,
  ListItem,
  ListItemText,
  Link,
  ListItemAvatar,
  Tooltip,
} from "@material-ui/core";

const navigationLinks = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "" },
  { label: "Materials", icon: <MaterialIcon />, path: "materials" },
  { label: "Sell", icon: <SellIcon />, path: "selling" },
  { label: "Messages", icon: <MessagesIcon />, path: "messages" },
];
const SidebarContent = () => {
  const navigate = useNavigate();
  return (
    <List>
      {navigationLinks.map(({ icon, path, label }) => (
        <ListItem
          button
          key={label}
          onClick={() => {
            navigate(path);
          }}
        >
          <ListItemAvatar>{icon}</ListItemAvatar>
          <ListItemText>
            <span style={{ fontWeight: 600 }}>{label}</span>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarContent;
