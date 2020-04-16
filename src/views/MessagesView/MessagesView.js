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
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import { Masonry, List as MasonList } from "masonic";
import PleaseLogin from "./PleaseLoginMessage";
import ChatList from "components/Chat/ChatList";
import ChatBar from "components/Chat/ChatBar";
import ChatHeader from "components/Chat/ChatsHeader";
import ConversationHead from "components/Chat/ConversationHeader";
import ChatDialog from "components/Chat/ChatDialog";
import {
  Button,
  Box,
  Container,
  Drawer,
  Toolbar,
  Paper,
} from "@material-ui/core";
import { addToFirebase, setProductDocId } from "redux/createProductSlice";
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

const MessagesView = () => {
  const windowStyles = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid } = useSelector((s) => s.auth.userData);
  const { currentChatId } = useSelector((s) => s.product);
  const { loggedIn } = useSelector((s) => s.auth);
  console.log(`⭐: MessagesView -> uid`, uid);

  const productRef =
    uid &&
    database
      .collection("materials")
      .orderBy("created", "desc")
      .where("uid", "==", uid);
  const discussions =
    uid &&
    database
      .collectionGroup("product_discussion")
      .where("ownerId", "==", uid)
      .orderBy("messages");
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
  console.log(`⭐: MessagesView -> userDiscussions`, userDiscussions);

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
    <Container
      style={{
        padding: "30px",
        height: "80vh",
        minHeight: "50vh",
        position: "relative",
      }}
    >
      <Box mt={"10px"} display="flex">
        <Box flexGrow={1} />
      </Box>
      <div
        id="drawer-ss"
        style={{
          display: "flex",
          height: "100%",
          width: "100%",

          position: "relative",
        }}
      >
        <div style={{ background: "white" }}>
          <ChatHeader />
          <ChatList id="drawer-ss" inboxData={userDiscussions} />
        </div>
        <div
          style={{
            minHeight: "100%",
            width: "100%",
            overflowY: "scroll",
            position: "relative",
          }}
        >
          {/* <Paper square>
            <Toolbar disableGutters>
              <ConversationHead />
            </Toolbar>
          </Paper> */}

          <Outlet />
        </div>
      </div>
    </Container>
  );
};

export default MessagesView;
