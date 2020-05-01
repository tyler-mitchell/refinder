import { Grid, Paper } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import ChatList from "../ChatList";
import ChatHeader from "../ChatsHeader";

const ChatSideBar = ({ discussions, userType }) => {
  return (
    <Paper
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ChatHeader />
      <ChatList discussions={discussions} userType={userType} />
      <div style={{ flexGrow: 1 }} />
    </Paper>
  );
};

export default ChatSideBar;
