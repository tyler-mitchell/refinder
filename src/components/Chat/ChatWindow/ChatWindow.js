import React, { Suspense } from "react";
import ChatSettings from "components/Chat/ChatSettings";
import ChatBar from "components/Chat/ChatBar";
import ChatDialog from "components/Chat/ChatDialog";
import ConversationHead from "components/Chat/ConversationHeader";

import { useNavigate } from "react-router";
import {
  Container,
  Grid,
  makeStyles,
  Box,
  Dialog,
  AppBar,
  DialogContent,
} from "@material-ui/core";
import ChatContextProvider from "../ChatContext";
import {
  Root,
  Header,
  Content,
  Sidebar,
  SecondaryInsetSidebar,
  InsetContainer,
  Footer,
  ConfigGenerator,
} from "@mui-treasury/layout";
import useStyles from "./ChatWindow.styles";
import { useSelector, useDispatch } from "react-redux";
import { selectUserID } from "redux/authSlice";
import { initializeProduct } from "redux/productSlice";
import { useParams, useSearchParams } from "react-router-dom";
import { database } from "firebase/core";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { motion } from "framer-motion";
import { animateScroll } from "react-scroll";

const conversationAnimationConfig = {
  open: {
    opacity: 1,
    y: 0,
  },
  closed: {
    opacity: 0,
    y: 15,
  },
};
const ChatWindow = (chatType = "offer") => {
  const styles = useStyles();
  const uid = useSelector(selectUserID);
  let dispatch = useDispatch();
  const { currentChatId, productId } = useSelector((s) => s.product);

  const {
    discussionID: discussionIDParam,
    materialID: materialIDParam,
  } = useParams();
  const p = useParams();
  console.log(`⭐: ChatWindow -> materialIDParam`, materialIDParam);
  console.log(`✅: useParams()`, p);
  console.log(`✅: discussionIDParam`, discussionIDParam);
  // for /messages route
  const searchParams = useSearchParams();
  const productSearchIDParam = searchParams.get("product");
  console.log(`⭐: ChatWindow -> productSearchIDParam`, productSearchIDParam);

  React.useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: "rcw-messages-container",
      duration: 0,
      delay: 0,
      offset: 50,
      smooth: false,
      isDynamic: true,
    });
  }, []);

  let discussionRef = null;
  if (materialIDParam && uid) {
    discussionRef = database.doc(
      `materials/${materialIDParam}/product_discussion/${uid}`
    );
  } else if (productSearchIDParam && discussionIDParam) {
    discussionRef = database.doc(
      `materials/${productSearchIDParam}/product_discussion/${discussionIDParam}`
    );
  }

  const productRef =
    productSearchIDParam &&
    database.collection("materials").doc(productSearchIDParam);

  const [discussion, loading, error] = useDocumentData(discussionRef);
  const [productDoc, loadingP, errorP] = useDocumentData(productRef);
  console.log(`⭐: ChatWindow -> product`, productDoc);

  React.useEffect(() => {
    // if(!currentChatId && productId)
    if (!loadingP && productDoc) {
      const {
        displayName,
        title,
        description,
        avatar,
        productId,
        uid,
        address,
      } = productDoc;
      console.log(`⭐: ChatWindow -> productId`, productId);
      // dispatch();

      dispatch(
        initializeProduct({
          displayName,
          title,
          description,
          address,
          avatar,
          productId: productSearchIDParam,
          uid: discussionIDParam,
        })
      );
    }
  }, [loadingP]);
  return (
    <motion.div
      id="rcw-container"
      sx={{
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        margin: "0 20px 20px 0",
        maxWidth: "370px",
        position: "fixed",
        right: 0,
        zIndex: 999,
        width: "100%",
      }}
    >
      <motion.div
        variants={conversationAnimationConfig}
        initial={{
          opacity: 0,
        }}
        animate={"open"}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "none",
          boxShadow: "0px 2px 10px 1px #b5b5b5",
          borderRadius: "10px",
        }}
      >
        <ConversationHead />
        <ChatDialog messages={discussion?.messages} uid={uid} />
        <ChatBar />
      </motion.div>
    </motion.div>
  );
};

export default ChatWindow;
