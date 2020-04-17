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
  Grid,
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
      maxWidth="md"
      style={{
        padding: "30px",
        height: "90vh",
        minHeight: "90vh",
        position: "relative",
      }}
    >
      <Grid container>
        <Grid item xs={3} style={{ background: "white", borderRadius: "8px" }}>
          <ChatHeader />
          <ChatList inboxData={userDiscussions} />
        </Grid>

        <Grid item xs={8}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MessagesView;
