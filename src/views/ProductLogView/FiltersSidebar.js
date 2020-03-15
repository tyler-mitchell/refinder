import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import Folder from "@material-ui/icons/Folder";
import People from "@material-ui/icons/People";
import Star from "@material-ui/icons/Star";
import Schedule from "@material-ui/icons/Schedule";
import OfflinePin from "@material-ui/icons/OfflinePin";
import Publish from "@material-ui/icons/Publish";
import Backup from "@material-ui/icons/Backup";
import Delete from "@material-ui/icons/Delete";
import Settings from "@material-ui/icons/Settings";
import ListSubheader from "@material-ui/core/ListSubheader";

const list = [
  {
    primaryText: "Wood",
    icon: <Folder />
  },
  {
    primaryText: "Glass",
    icon: <People />
  },
  {
    primaryText: "Brick",
    icon: <Star />
  },
  {
    primaryText: "Concrete",
    icon: <Star />
  },
  {
    primaryText: "Doors",
    icon: <Star />
  },
  {
    primaryText: "Windows",
    icon: <Star />
  },
  {
    primaryText: "Fabrics",
    icon: <Schedule />
  },
  {
    primaryText: "Carpet",
    icon: <Schedule />
  },
  {
    primaryText: "Paper and Cardboard",
    icon: <OfflinePin />
  },
  {
    primaryText: "Metals",
    icon: <Publish />
  },
  {
    primaryText: "Organics",
    icon: <Backup />
  },
  {
    primaryText: "Rubber",
    icon: <Backup />
  },
  {
    primaryText: "Electronics",
    icon: <Backup />
  },

  {
    primaryText: "Furniture",
    icon: <Backup />
  },
  {
    primaryText: "Construction and Demolition",
    icon: <Delete />
  }
];
const NavContent = ({ onClickItem }) => (
  <Paper style={{ width: '300px', position: 'relative' }}>
    <List>
      <ListSubheader>All Categories</ListSubheader>
      {list.map(({ primaryText, icon }, i) => (
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
