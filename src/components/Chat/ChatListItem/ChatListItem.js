import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import cx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { setCurrentDiscussion } from "redux/productSlice";

import useStyles from "./ChatListItem.styles";

const ChatListItem = (props) => {
  const {
    bold,
    active,
    customerAvatar,
    customerName,
    ownerName,
    ownerAvatar,
    messages,
    discussionId,
    productId,
    responded,
    concise,
    userType,
  } = props;

  const styles = useStyles({ bold, active });
  console.log(`⭐: discussion`, props);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let searchParams = useSearchParams();
  const { currentDiscussionId, productId: currentProductId } = useSelector(
    (s) => s.product
  );

  let { name, avatar } =
    userType === "seller"
      ? {
          name: ownerName,
          avatar: ownerAvatar,
        }
      : {
          name: customerName,
          avatar: customerAvatar,
        };
  const info = messages[messages.length - 1]?.message;
  function addParam(name, value) {
    let newParams = new URLSearchParams(searchParams);
    newParams.set(name, value);
    return newParams;
  }
  function handleChatClick() {
    dispatch(
      setCurrentDiscussion({ currentDiscussionId: discussionId, userType })
    );
    console.log(
      `⭐: handleChatClick -> ${currentDiscussionId} === ${discussionId}`,
      currentDiscussionId === discussionId
    );

    navigate(`${discussionId}?${addParam("product", productId)}`, {
      replace: true,
    });
  }

  return (
    <Box px={1}>
      <ListItem
        button
        selected={
          userType === "seller"
            ? currentDiscussionId === discussionId
            : currentProductId === productId
        }
        onClick={handleChatClick}
        className={cx(styles.root, styles.rootHover)}
      >
        <Avatar src={avatar} size="small" className={styles.avatar} />
        {!concise && (
          <>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle2">{name}</Typography>
                  <Typography varaint="body2">{productId}</Typography>
                </>
              }
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
