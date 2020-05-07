import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import { ReactComponent as NoMail } from "assets/no_mail.svg";
import no_messages from "assets/no_messages.jpg";

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
      {discussions?.length ? (
        <ChatList discussions={discussions} userType={userType} />
      ) : (
        <div
          style={{
            padding: "0px 30px",
            display: "flex",
            opacity: 0.9,
            backgroundImage:
              "radial-gradient( circle farthest-corner at 18.7% 37.8%,  rgba(40, 184, 251, 0.1) 0%, rgba(225,234,238,0.2) 90% )",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            style={{
              // color: "#11b0fb",
              color: "rgba(0, 56, 82, 0.4)",
              fontWeight: 800,
              position: "absolute",
              top: "25%",
              width: "80%",
            }}
          >
            {userType === "buyer"
              ? "You haven't made any offers yet..."
              : "You have no offers right now..."}
          </Typography>
          <NoMail width="100%" />
        </div>
      )}

      <div style={{ flexGrow: 1 }} />
    </Paper>
  );
};

export default ChatSideBar;
