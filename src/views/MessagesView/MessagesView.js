import { Box, Container, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import ChatList from "components/Chat/ChatList";
import ChatHeader from "components/Chat/ChatsHeader";
import ProductCard from "components/ProductCard";
import { database } from "firebase/core";
import { fieldPath } from "firebase/core";
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

const MessagesView = () => {
  const windowStyles = useStyles();
  const dispatch = useDispatch();
  let initialTab = useParams()["*"]?.split("/")[1];

  const { uid } = useSelector((s) => s.auth.userData);

  const { loggedIn } = useSelector((s) => s.auth);

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
      maxWidth="lg"
      style={{
        padding: "10px 30px 10px 30px",
        height: "80vh",
        minHeight: "90vh",
        marginBottom: "10px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MessagesTabs initialTab={initialTab} />
      <Box mb="10px" />

      <Outlet />
    </Container>
  );
};

const MessagesTabs = ({ initialTab }) => {
  const [tabIndex, setTabIndex] = React.useState(initialTab);
  const tabsStyles = useTabsStyles();
  const tabItemStyles = useTabItemStyles();
  const navigate = useNavigate();

  return (
    <Tabs
      // variant={"fullWidth"}
      classes={tabsStyles}
      value={tabIndex}
      onChange={(e, path) => {
        setTabIndex(path);
        navigate(path);
      }}
    >
      <Tab value="buying" classes={tabItemStyles} label={"Buying"} />
      <Tab value="selling" classes={tabItemStyles} label={"Selling"} />
    </Tabs>
  );
};

export default MessagesView;
