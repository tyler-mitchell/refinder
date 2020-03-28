import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import useStyles from "./ChatListItem.styles";

const ChatListItem = ({
  bold,
  active,
  avatar,
  name,
  info,
  responded,
  concise
}) => {
  const styles = useStyles({ bold, active });
  return (
    <Box px={1}>
      <ListItem className={cx(styles.root, styles.rootHover)}>
        <Avatar src={avatar} className={styles.avatar} />
        {!concise && (
          <>
            <ListItemText
              primary={name}
              secondary={info}
              primaryTypographyProps={{ noWrap: true }}
              secondaryTypographyProps={{ noWrap: true }}
              classes={{ primary: styles.primary, secondary: styles.secondary }}
            />
            <Box position={"relative"}>
              <MoreHoriz className={styles.more} />
              {bold && <div className={cx(styles.float, styles.dot)} />}
              {responded && (
                <Avatar
                  src={avatar}
                  className={cx(styles.float, styles.responded)}
                />
              )}
            </Box>
          </>
        )}
      </ListItem>
    </Box>
  );
};

export default ChatListItem;
