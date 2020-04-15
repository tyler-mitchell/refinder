import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ChatMsg from "../ChatMsg/ChatMsg";
import useStyles from "./ChatDialog.styles";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { database } from "firebase/core";
import { useSelector } from "react-redux";
import { selectUserID } from "redux/authSlice";
// import {  } from "redux/productSlice";
import { useParams } from "react-router-dom";
const AVATAR = "https://i.pravatar.cc/300?img=13";

const ChatDialog = ({ isAdmin }) => {
  let { discussionID } = useParams();
  let params = useParams();
  console.log(`⭐: ChatDialog -> params`, params);
  console.log(`⭐: ChatDialog -> discussionID`, discussionID);
  const uid = useSelector(selectUserID);

  const { productId, currentChatId } = useSelector((s) => s.product);
  console.log(`⭐: ChatDialog -> productId`, productId);
  // const discussionRef = database.doc(
  //   `materials/${productId}/product_discussion/${uid}`
  // );
  const discussionRef = database.doc(
    `materials/${productId}/product_discussion/${currentChatId || discussionID}`
  );

  // status: [approved, 8uou0980098]

  const [discussion, loading, error] = useDocumentData(discussionRef);
  console.log(`⭐: ChatDialog -> discussion`, discussion);

  React.useEffect(() => {
    // componentDidMount(), componentDidUpdate()
    // effect dependency array
  }, [discussion]);
  const dialogRef = React.useRef();
  // React.useEffect(() => {
  //   // componentDidMount(), componentDidUpdate()

  //   if (dialogRef.current) {
  //     dialogRef.current.scrollTop = dialogRef.current.scrollHeight;
  //   }
  //   // effect dependency array
  // });
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
    !loading && (
      <Box display="flex" justifyContent="center">
        <Box
          // p={"16px 10px 12px 10px"}
          pl="15px"
          pt="25px"
          width="100%"
          ref={dialogRef}
        >
          {/* {discussion?.messages.map((message, index) => {
            let side = "right";
          })} */}
          <ChatMsg
            avatar={AVATAR}
            side={"left"}
            messages={[{ type: "offer" }]}
          />

          {groupMessages(discussion?.messages)?.map((messageGroup, index) => {
            console.log(`⭐: ChatDialog -> messageGroup[0]`, messageGroup[0]);
            return (
              <>
                <ChatMsg
                  avatar={AVATAR}
                  side={messageGroup.sender === uid ? "right" : "left"}
                  messages={messageGroup.contents}
                />
                {/* {messageGroup.sender} */}
              </>
            );
          })}

          {/* <ChatMsg
          avatar={AVATAR}
          messages={[
            "Hi Jenny, How r u today?",
            "Did you train yesterday",
            "ayeeeee",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida."
          ]}
        />
        <ChatMsg avatar={AVATAR} messages={["u up?"]} />
        <Typography className={styles.date}>FRI 1:46 PM</Typography>
        <ChatMsg
          side={"right"}
          messages={[
            "Great! What's about you?",
            "Of course I did. Speaking of which check this out",
            {
              type: "image",
              alt: "sticker",
              src:
                "https://scontent.fbkk12-3.fna.fbcdn.net/v/t39.1997-6/47236319_2150120948374011_4041608446519279616_n.png?_nc_cat=1&_nc_eui2=AeFis6Ozie5kjvkroSrDVnNAgqObZIvcuVVgXzfeKcO4DwwScziUGg6fw_1q8iRI49LMJ2ZJj037zvV3NqoMnVmqCtt9rWUwtLN2RENWfYPQYg&_nc_ohc=KE5rZeqFyBIAQkojKlvtrWdxe2rdAYR6Ps69ry7-0ahej4-YPP8Dyub_g&_nc_ht=scontent.fbkk12-3.fna&oh=95c38213f29607e0a82c34d1a427b2b1&oe=5E9E92B3"
            },
            "Commodo ullamcorper a lacus vestibulum sed arcu. Sed faucibus turpis in eu mi bibendum neque egestas. Maecenas volutpat blandit aliquam etiam erat velit. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Suspendisse sed nisi lacus sed viverra."
          ]}
        />
        <Typography className={styles.date}>FRI 4:18 PM</Typography>
        <ChatMsg
          avatar={AVATAR}
          messages={[
            "Im good.",
            "See u later.",
            {
              type: "image",
              alt: "sticker",
              src:
                "https://scontent.fbkk12-3.fna.fbcdn.net/v/t39.1997-6/47165057_2150118098374296_5034322199196991488_n.png?_nc_cat=1&_nc_eui2=AeGsL8WciYpwOySYRQINElIdV9NubJ7ZbWTW9J5-DlXHPiLCKR8Zvvd4nVyPH4Wa8kceFiL10mXvokNFcEJx9JWz-6XLYgCLmOgTniFDbSjUPw&_nc_ohc=pewFeK6M1ZIAQkL5L9QR2FZcwYjZ0FTWid2zHeUqboLU4azOITkLVGaog&_nc_ht=scontent.fbkk12-3.fna&oh=27a2a48aabccd4cdae4ec4f3f775daa9&oe=5EAF0F3B"
            }
          ]}
        /> */}

          <Typography style={{ color: "red" }} className={styles.date}>
            {/* {uid === ownerId ? "You are OWNER" : "You are CUSTOMER"} */}
            {/* {": " + uid} */}
          </Typography>
        </Box>
      </Box>
    )
  );
};

export default ChatDialog;
