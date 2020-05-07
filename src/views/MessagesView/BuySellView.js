import {
  Box,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  Outlet,
  useNavigate,
  useParams,
  useResolvedLocation,
} from "react-router-dom";
import styled from "styled-components";

import ChatList from "components/Chat/ChatList";
import ChatHeader from "components/Chat/ChatsHeader";
import ChatSideBar from "components/Chat/ChatSideBar";
import { ChatWindowContainer } from "components/Chat/ChatWindow/ChatWindow";
import ProductCard from "components/ProductCard";
import { database } from "firebase/core";
import { fieldPath } from "firebase/core";
import { setCurrentDiscussion } from "redux/productSlice";
import { useTabItemStyles, useTabsStyles } from "theme/tabStyles";

import PleaseLogin from "./PleaseLoginMessage";

const Product = ({ index, data }) => {
  return <ProductCard variant="list" index={index} key={index} {...data} />;
};

const useStyles = makeStyles(() => ({
  header: {
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, .10)",
    backgroundColor: "#ffffff",
  },
  insetBody: {
    borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
    overflowY: "auto",
  },
  insetDrawerPaper: {
    width: "100%",
    // maxWidth: 300
  },
  contentContainer: {
    // flex: 1,
    minHeight: 0,
    height: "500px",
    width: "100%",
    borderRadius: "10px",
  },
  content: {
    maxHeight: "100%",
    overflowY: "auto",
  },
  footer: {
    height: 52,
    display: "flex",

    alignItems: "center",
    border: "none",
    padding: "0 8px",
  },
  edit: {
    backgroundColor: "rgba(0,0,0,0.04)",
  },
}));
const ChatWrapper = styled.div`
  border-radius: 0px 20px 20px 0px;
  padding: 5px 20px;
  background: #ffffff;

  width: 100%;
  position: relative;

  z-index: 0;
  height: 100%;
`;
export const BuyView = () => {
  const windowStyles = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid } = useSelector((s) => s.auth.userData);

  const { loggedIn } = useSelector((s) => s.auth);
  console.log(`⭐: MessagesView -> uid`, uid);

  const buyingDiscussionsRef =
    uid &&
    database
      .collectionGroup("product_discussion")
      .where("customerId", "==", `${uid}`)
      .orderBy("messages");

  const [buyerDiscussions, loadingD, errD] = useCollectionData(
    buyingDiscussionsRef,
    {
      idField: "discussionId",
    }
  );
  console.log(`⭐: BuyView -> errD`, errD);
  console.log(`⭐: BuyView -> buyerDiscussions`, buyerDiscussions);

  return <MessagesLayout discussions={buyerDiscussions} userType="buyer" />;
};
export const SellView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid } = useSelector((s) => s.auth.userData);

  const { loggedIn } = useSelector((s) => s.auth);

  const sellingDiscussionsRef =
    uid &&
    database
      .collectionGroup("product_discussion")
      .where("ownerId", "==", uid)
      .orderBy("messages");

  const [sellerDiscussions, loadingD, errD] = useCollectionData(
    sellingDiscussionsRef,
    {
      idField: "discussionId",
    }
  );
  console.log(`⭐: SellView -> sellerDiscussions`, sellerDiscussions);

  return <MessagesLayout discussions={sellerDiscussions} userType="seller" />;
};

const MessagesLayout = ({ discussions, userType }) => {
  const windowStyles = useStyles();

  let dispatch = useDispatch();
  const pathSegments = useParams()["*"].split("/");

  React.useEffect(() => {
    if (pathSegments.length === 3) {
      const discussionIdParam = pathSegments[pathSegments.length - 1];
      dispatch(
        setCurrentDiscussion({
          currentDiscussionId: discussionIdParam,
          userType,
        })
      );
    }
  }, []);

  return (
    <Paper style={{ height: "100%", borderRadius: "10px" }} variant="outlined">
      <Grid
        container
        style={{ position: "relative", height: "100%" }}
        alignItems="stretch"
      >
        <Grid
          item
          xs={4}
          style={{ flex: 1, position: "relative", zIndex: 1, height: "100%" }}
        >
          <ChatSideBar discussions={discussions} userType={userType} />
        </Grid>
        <Grid
          item
          xs={8}
          style={{ position: "relative", zIndex: 0, height: "100%" }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </Paper>
  );
};
