import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ChatMsg from "../ChatMsg/ChatMsg";
import useStyles from "./ChatDialog.styles";

import { AnimatePresence, motion } from "framer-motion";

const AVATAR = "https://i.pravatar.cc/300?img=13";

const ChatDialog = ({ messages, isOwner, isRecipient, fromAvatar, uid }) => {
  const styles = useStyles();
  function groupMessages(messages) {
    if (!messages) {
      return [];
    }
    const { groupArr } = messages?.reduce(
      (acc, cur, index, arr) => {
        if (acc.prevSenderId === cur?.senderId || index === 0) {
          acc.group.push(cur.message);
          if (index === arr.length - 1) {
            acc.groupArr.push({
              sender: cur?.senderId,
              contents: acc.group,
            });
          }
        } else {
          acc.groupArr.push({ sender: acc.prevSenderId, contents: acc.group });
          if (index === arr.length - 1) {
            acc.groupArr.push({
              sender: cur.senderId,
              contents: [cur.message],
            });

            return acc;
          }
          acc.group = [cur.message];
        }

        // if (index === messages.length - 1) {
        //   return acc;
        // }
        acc.prevSenderId = cur?.senderId;
        return acc;
      },
      { groupArr: [], group: [], prevSenderId: null }
    );

    console.log(`⭐: groupMessages -> r`, groupArr);
    return groupArr;
  }
  return (
    <div
      sx={{
        backgroundColor: "white",
        // height: "50vh",
        maxHeight: "100%",

        p: 1,
      }}
      id="rcw-messages-container"
    >
      {!messages && <div></div>}
      <AnimatePresence initial={false}>
        {groupMessages(messages)?.map((messageGroup, index) => {
          console.log(`⭐: ChatDialog -> messageGroup[0]`, messageGroup[0]);
          return (
            <motion.div
              positionTransition
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.2, stiffness: 500 },
              }}
              sx={{
                margin: "5px",
                wordWrap: "break-word",
                display: "flex",
              }}
            >
              <ChatMsg
                avatar={AVATAR}
                side={messageGroup.sender === uid ? "right" : "left"}
                messages={messageGroup.contents}
              />
              {/* {messageGroup.sender} */}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ChatDialog;
