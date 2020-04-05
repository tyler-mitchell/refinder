import React from "react";
import PropTypes from "prop-types";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TagFaces from "@material-ui/icons/TagFaces";
import Reply from "@material-ui/icons/Reply";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import useStyles from "./ChatMsg.styles";
import Offer from "components/Chat/Offer";
const ChatMsg = ({ avatar, messages, side }) => {
  const styles = useStyles();
  const attachClass = (index) => {
    if (index === 0) {
      return styles[`${side}First`];
    }
    if (index === messages.length - 1) {
      return styles[`${side}Last`];
    }
    return "";
  };
  return (
    <Grid
      container
      spacing={2}
      justify={side === "right" ? "flex-end" : "flex-start"}
    >
      {side === "left" && (
        <Grid item>
          <Avatar src={avatar} className={cx(styles.avatar)} />
        </Grid>
      )}
      <Grid item xs>
        {messages.map((msg, i) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div
              key={msg?.id || i}
              className={cx(styles.row, styles[`${side}Row`])}
            >
              <div className={cx(styles.msgBox, styles[`${side}MsgBox`])}>
                {typeof msg === "string" && (
                  <Typography
                    align={"left"}
                    className={cx(styles.msg, styles[side], attachClass(i))}
                  >
                    {msg}
                  </Typography>
                )}
                {typeof msg === "object" && msg.type === "image" && (
                  <img className={styles.image} alt={msg.alt} {...msg} />
                )}
                {typeof msg === "object" && msg.type === "offer" && (
                  <Offer
                    classes={styles[`${side}Row`]}
                    price="$32"
                    overline="Seller's price"
                  />
                  // <img className={styles.image} alt={msg.alt} {...msg} />
                )}
                <IconButton className={styles.iconBtn}>
                  <TagFaces />
                </IconButton>
                <IconButton className={styles.iconBtn}>
                  <Reply />
                </IconButton>
                <IconButton className={styles.iconBtn}>
                  <MoreHoriz />
                </IconButton>
              </div>
            </div>
          );
        })}
      </Grid>
    </Grid>
  );
};

ChatMsg.propTypes = {
  avatar: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string),
  side: PropTypes.oneOf(["left", "right"]),
};
ChatMsg.defaultProps = {
  avatar: "",
  messages: [],
  side: "left",
};

export default ChatMsg;
