import React from "react";
import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";
import { useNavigate, Outlet } from "react-router-dom";
import { List, ListItem, CssBaseline } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "components/ProductCard";
import { database } from "firebase/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Masonry, List as MasonList } from "masonic";
import PleaseLogin from "./PleaseLoginMessage";
import ChatList from "components/Chat/ChatList";
import { Button, Box, Container, Drawer } from "@material-ui/core";
import { addToFirebase, setProductDocId } from "redux/createProductSlice";
const Product = ({ index, data }) => {
  return <ProductCard variant="list" index={index} key={index} {...data} />;
};

const MessagesView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid } = useSelector((s) => s.auth.userData);
  const { loggedIn } = useSelector((s) => s.auth);
  console.log(`⭐: MessagesView -> uid`, uid);
  const productRef =
    uid &&
    database
      .collection("materials")
      .orderBy("created", "desc")
      .where("uid", "==", uid);
  const productDiscussionsRef =
    uid &&
    database
      .collectionGroup("product_discussion")
      .where("ownerId", "==", uid)
      .orderBy("messages");

  const [userDiscussions, loadingD, errD] = useCollectionData(
    productDiscussionsRef,
    {
      idField: "id",
    }
  );
  console.log(`⭐: MessagesView -> errD`, errD);

  console.log(`⭐: MessagesView -> userDiscussions`, userDiscussions);
  // console.log(`⭐: MessagesView -> userProducts`, userProducts);
  if (loggedIn === false) {
    return (
      <Container
        style={{
          display: "flex",
          height: "50vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <PleaseLogin />
      </Container>
    );
  }
  return (
    <Container style={{ padding: "30px", height: "100%" }}>
      <Box mt={"10px"} display="flex">
        <Box flexGrow={1} />
      </Box>
      <div id="drawer-s" style={{ display: "flex" }}>
        <ChatList id="drawer-s" inboxData={userDiscussions} />
      </div>
      <Outlet />
    </Container>
  );
};

export default MessagesView;
