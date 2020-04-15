import React from "react";
import ChatListItem from "../ChatListItem";
import { Drawer, ListItem, List, Grid } from "@material-ui/core";

const data = [
  {
    avatar: "https://i.pravatar.cc/300?img=11",
    name: "Jordyn Frank",
    info: "You sent a photo • 2:04 PM",
    responded: true,
  },
  {
    avatar: "https://i.pravatar.cc/300?img=12",
    name: "Marwan Combs",
    info: "Where r u? • 1:54 PM",
    bold: true,
  },
  {
    avatar: "https://i.pravatar.cc/300?img=13",
    name: "Imaad Casey",
    info: "You: Good to see u • SAT",
    active: true,
  },
  {
    avatar: "https://i.pravatar.cc/300?img=14",
    name: "Philip Rhodes",
    info: "You: Lorem ipsum • THU",
    responded: true,
  },
  {
    avatar: "https://i.pravatar.cc/300?img=15",
    name: "Chardonnay Raymond",
    info: "Chardonnay called you • THU",
  },
  {
    avatar: "https://i.pravatar.cc/300?img=16",
    name: "Akram Farmer",
    info: "You: still look forw... • THU",
    responded: true,
  },
  {
    avatar: "https://i.pravatar.cc/300?img=17",
    name: "Nichola Mackie",
    info: "You: https://mui... • DEC 10",
  },
  {
    avatar: "https://i.pravatar.cc/300?img=18",
    name: "Ines Page",
    info: "You called Ines • DEC 9",
  },
  {
    avatar: "https://i.pravatar.cc/300?img=19",
    name: "Ephraim Gonzalez",
    info: "I think you can d... • DEC 9",
    responded: true,
  },
  {
    avatar: "https://i.pravatar.cc/300?img=20",
    name: "Tyrell Stark",
    info: "Okay, I think... • DEC 6",
  },
  {
    avatar: "https://i.pravatar.cc/300?img=21",
    name: "Tasha Whitmore",
    info: "You sent an attach... • NOV 30",
  },
  {
    avatar: "https://i.pravatar.cc/300?img=22",
    name: "Hawwa Davenport",
    info: "okay kub • NOV 28",
  },
];

const ChatList = ({ concise, id, inboxData = [] }) => {
  return (
    <Drawer
      open={true}
      hideBackdrop={true}
      variant="permanent"
      PaperProps={{
        style: {
          position: "relative",
          userSelect: "none",
          borderTopLeftRadius: "15px",
          height: "100%",
        },
      }}
      BackdropProps={{ style: { position: "relative" } }}
      ModalProps={{
        container: document.getElementById(id),
        style: { position: "relative" },
      }}
    >
      <Grid item>
        <List>
          {(inboxData || []).map((discussion) => {
            const data = {
              name: discussion.customerName,
              avatar: discussion.customerAvatar,
              info: discussion.messages[discussion.messages.length - 1].message,
            };
            return (
              <ChatListItem
                discussionId={discussion.id}
                key={discussion.productId}
                productId={discussion.productId}
                {...discussion}
                {...data}
                concise={concise}
              />
            );
          })}
          <div style={{ flexGrow: 1 }} />
        </List>
      </Grid>
    </Drawer>
  );
};

export default ChatList;
