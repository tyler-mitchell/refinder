import {
  AppBar,
  Box,
  Container,
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
  Paper,
  Toolbar,
} from "@material-ui/core";
import {
  ConfigGenerator,
  Content,
  Footer,
  Header,
  InsetContainer,
  Root,
  SecondaryInsetSidebar,
  Sidebar,
} from "@mui-treasury/layout";
import { motion } from "framer-motion";
import React, { Suspense } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams, useSearchParams } from "react-router-dom";
import { animateScroll } from "react-scroll";
import styled from "styled-components";

import ChatBar from "components/Chat/ChatBar";
import ChatDialog from "components/Chat/ChatDialog";
import ChatSettings from "components/Chat/ChatSettings";
import ConversationHead from "components/Chat/ConversationHeader";
import { database } from "firebase/core";
import { selectUserID } from "redux/authSlice";
import { initializeProduct, setUserType } from "redux/productSlice";

import ChatContextProvider from "../ChatContext";
import useStyles from "./ChatWindow.styles";

const Wrap = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  position: relative;
`;
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
  const uid = useSelector(selectUserID);
  let dispatch = useDispatch();
  const { productId, avatar, displayName, price, userType } = useSelector(
    (s) => s.product
  );
  const { recipientAvatar, recipientName } = useSelector((s) => s.discussion);
  console.log(`⭐: ChatWindow -> recipientAvatar`, recipientAvatar);

  const {
    discussionID: discussionIDParam,
    materialID: materialIDParam,
  } = useParams();

  // for /messages route
  const searchParams = useSearchParams();
  const productSearchIDParam = searchParams.get("product");

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
  console.log(`⭐: ChatWindow -> discussion`, discussion);
  const [product, loadingP, errorP] = useDocumentData(productRef, {
    idField: "productId",
  });
  console.log(`⭐: ChatWindow -> product`, product);

  React.useEffect(() => {
    // if(!currentChatId && productId)
    if (!loadingP && product) {
      console.log(`⭐: ChatWindow -> productId`, productId);
      // dispatch();

      dispatch(
        initializeProduct({
          ...product,
          currentUserId: uid,
        })
      );
    }
  }, [loadingP]);
  return (
    <ChatWindowContainer maxWidth="lg">
      {userType && (
        <Paper
          variant="outlined"
          style={{ width: "100%", borderRadius: "0 10px 0 0" }}
        >
          <Toolbar disableGutters>
            <ConversationHead
              materialID={productId}
              avatar={recipientAvatar}
              productTitle={product?.title}
              name={recipientName}
            />
          </Toolbar>
        </Paper>
      )}

      <ChatDialog
        fromAvatar={recipientAvatar || avatar}
        name={recipientName || displayName}
        messages={discussion?.messages}
        originalPrice={price}
        uid={uid}
      />

      <Toolbar>
        <ChatBar />
      </Toolbar>
    </ChatWindowContainer>
  );
};

export const ChatWindowContainer = ({ children }) => {
  return (
    <div maxWidth="lg" style={{ height: "100%" }}>
      <Wrap>{children}</Wrap>
    </div>
  );
};

export default ChatWindow;
