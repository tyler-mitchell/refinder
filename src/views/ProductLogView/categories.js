import React from "react";
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

export const categories = [
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
