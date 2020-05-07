import { Drawer, Grid, List, ListItem } from "@material-ui/core";
import React from "react";

import ChatListItem from "../ChatListItem";

const ChatList = ({ concise, id, discussions = [], userType }) => {
  return (
    <div>
      <List>
        {(discussions || []).map((discussion) => {
          return (
            <ChatListItem
              key={discussion.productId}
              userType={userType}
              {...discussion}
              concise={concise}
            />
          );
        })}
        <div style={{ flexGrow: 1 }} />
      </List>
    </div>
  );
};

export default ChatList;
