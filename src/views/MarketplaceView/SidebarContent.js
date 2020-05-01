import {
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import ServicesIcon from "@material-ui/icons/Build";
import DashboardIcon from "@material-ui/icons/DashboardRounded";
import SellIcon from "@material-ui/icons/LocalAtm";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import MaterialIcon from "@material-ui/icons/Terrain";
import MessagesIcon from "@material-ui/icons/Textsms";

import React from "react";
import { useNavigate } from "react-router-dom";

const navigationLinks = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "" },
  { label: "Materials", icon: <MaterialIcon />, path: "materials" },
  { label: "Sell", icon: <SellIcon />, path: "selling" },
  { label: "Messages", icon: <MessagesIcon />, path: "messages/selling" },
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
