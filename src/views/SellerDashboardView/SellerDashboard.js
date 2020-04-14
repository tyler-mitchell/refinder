import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate, Outlet } from "react-router-dom";
import { Button, Box, Container } from "@material-ui/core";
import { List, ListItem, CssBaseline } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "components/ProductCard";
import { database } from "firebase/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Masonry, List as MasonList } from "masonic";
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 600,
      lg: 900,
      xl: 1200,
    },
  },
});
const Product = ({ index, data }) => {
  return <ProductCard variant="list" index={index} key={index} {...data} />;
};

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { uid } = useSelector((s) => s.auth.userData);
  console.log(`⭐: SellerDashboard -> uid`, uid);
  const ref = database.collection("materials").where("uid", "==", uid);

  const [userProducts, loading, err] = useCollectionData(ref, {
    idField: "id",
  });
  console.log(`⭐: SellerDashboard -> userProducts`, userProducts);

  return (
    <Container style={{ padding: "30px", height: "100%" }}>
      <Box mt={"10px"} display="flex">
        <Box flexGrow={1} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("new");
          }}
        >
          New Product
        </Button>
      </Box>
      {!loading && (
        <MasonList
          rowGutter={20}
          columnGutter={25}
          // columnWidth={210}
          items={userProducts}
          tabIndex={false}
          clearPositions
          render={Product}
          // scrollTop={0}
          itemHeightEstimate={280}
          overscanBy={20}
        />
      )}
      <Outlet />
    </Container>
  );
};

export default SellerDashboard;
