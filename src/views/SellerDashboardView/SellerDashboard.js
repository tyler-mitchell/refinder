import { CssBaseline, List, ListItem } from "@material-ui/core";
import { Box, Button, Container, Drawer } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { List as MasonList, Masonry } from "masonic";
import React from "react";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import ChatList from "components/Chat/ChatList";
import ProductCard from "components/ProductCard";
import { database, fieldPath } from "firebase/core";
import { addToFirebase, setProductDocId } from "redux/createProductSlice";

import PleaseLogin from "./PleaseLoginMessage";

const Product = ({ index, data }) => {
  return <ProductCard variant="list" index={index} key={index} {...data} />;
};

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid } = useSelector((s) => s.auth.userData);
  const { loggedIn } = useSelector((s) => s.auth);
  console.log(`⭐: SellerDashboard -> uid`, uid);
  const productRef =
    uid &&
    database
      .collection("materials")
      .orderBy("created", "desc")
      .where("uid", "==", uid);

  const [userProducts, loading, err] = useCollectionData(productRef, {
    idField: "id",
  });
  console.log(`⭐: SellerDashboard -> err`, err);

  // console.log(`⭐: SellerDashboard -> userProducts`, userProducts);
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
      <Box mt={"10px"} mb="10px" display="flex">
        <Box flexGrow={1} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("new");
          }}
        >
          Create Product
        </Button>
        {/* <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch(setProductDocId());
            dispatch(addToFirebase(null));
          }}
        >
          TEST New Product
        </Button> */}
      </Box>
      <div id="drawer-s" style={{ display: "flex" }}>
        {!loading && (
          <MasonList
            rowGutter={20}
            columnGutter={25}
            // columnWidth={210}
            items={userProducts || []}
            tabIndex={false}
            clearPositions
            render={Product}
            // scrollTop={0}
            itemHeightEstimate={280}
            overscanBy={50}
          />
        )}
      </div>
      <Outlet />
    </Container>
  );
};

export default SellerDashboard;
