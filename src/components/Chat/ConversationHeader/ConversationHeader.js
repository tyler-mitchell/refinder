import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Info from "@material-ui/icons/Info";
import Phone from "@material-ui/icons/Phone";
import Videocam from "@material-ui/icons/Videocam";
import React from "react";

import useStyles from "./ConversationHeader.styles";

const ConversationHead = ({ name, avatar, productTitle }) => {
  const styles = useStyles();
  return (
    <ListItem
      ContainerComponent={"div"}
      ContainerProps={{ className: styles.container }}
      className={styles.root}
    >
      <ListItemAvatar>
        <Avatar src={avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={productTitle}
        secondary={name}
        // secondary={"active 17m ago"}
        classes={{ primary: styles.primary, secondary: styles.secondary }}
      />
      <ListItemSecondaryAction>
        {/* <IconButton className={styles.iconBtn}>
          <Phone />
        </IconButton>
        <IconButton className={styles.iconBtn}>
          <Videocam />
        </IconButton> */}
        <IconButton className={styles.iconBtn}>
          <Info />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ConversationHead;
