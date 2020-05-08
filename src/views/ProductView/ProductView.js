import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderRounded";
import MoreOptionsIcon from "@material-ui/icons/MoreHorizRounded";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import TimeAgo from "timeago-react";

import Map from "components/Map";
import ProductImages from "components/ProductImages";
import SellerCard from "components/SellerCard";
import { database } from "firebase/core";
import { initializeProduct } from "redux/productSlice";

import ProductDetails from "./ProductDetails";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const ProductView = () => {
  const theme = useTheme();
  const matchesMdDown = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(`⭐: ProductView -> matchesMdDown`, matchesMdDown);
  let { materialID } = useParams();
  let navigate = useNavigate();
  const location = useLocation();
  const { uid } = useSelector((state) => state.auth.userData);
  console.log(`⭐: ProductView -> uid`, uid);

  const productRef = database.doc(`materials/${materialID}`);
  const dispatch = useDispatch();
  const [product, loading, error] = useDocumentData(productRef, {
    idField: "productId",
  });
  console.log(`⭐: ProductView -> product`, product);

  React.useEffect(() => {
    if (!loading) {
      dispatch(initializeProduct({ currentUserId: uid, ...product }));
    }
    console.log(`⭐: ProductView -> product`, product);
    // console.log(`⭐: ProductView -> productInfo`, productInfo);
  }, [loading]);

  console.log(`⭐: ProductView -> location`, location);
  // console.log(`⭐: ProductView -> product`, product);
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    !loading && (
      <>
        <Container maxWidth="lg" style={{ padding: "30px" }}>
          <Grid
            container
            style={{ background: "white" }}
            item
            justify="space-between"
          >
            <Grid
              item
              container
              md={9}
              sm={6}
              xs={12}
              spacing={1}
              justify="space-around"
              direction={matchesMdDown ? "column-reverse" : "row"}
            >
              <Grid item lg={6} md={4}>
                <ProductImages
                  productImages={
                    product?.productImages ?? [{ downloadUrl: "" }]
                  }
                />
              </Grid>
              <Grid container item direction="column" lg={6} md={7} xs="auto">
                <Grid item style={{ width: "100%" }}>
                  <Box
                    display="flex"
                    width="100%"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Typography
                      variant="h4"
                      display="inline"
                      align="left"
                      style={{ fontWeight: "bold" }}
                      gutterBottom
                    >
                      {product?.title}
                    </Typography>
                    <Box flexGrow={1} />
                    <IconButton size="small">
                      <FavoriteIcon />
                    </IconButton>
                    <Box mx="2px" />
                    <IconButton edge="right" size="small">
                      <MoreOptionsIcon />
                    </IconButton>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      // display="inline"
                      style={{ fontWeight: "bold" }}
                    >
                      29103 Flying Arrow
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      align="right"
                      // display="inline"
                      style={{ fontWeight: "bold" }}
                    >
                      <TimeAgo datetime={product?.created?.toDate()} />
                    </Typography>
                  </Box>
                </Grid>
                <Divider />
                <Box mb="15px" />
                <Grid item>
                  <ProductDetails type={product?.type} price={product?.price} />
                  <Box mb="15px" />
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Public Sans",
                      fontSize: 19,
                    }}
                    // gutterBottom
                  >
                    Description
                  </Typography>

                  <Typography
                    variant="body1"
                    style={{
                      // fontFamily: "Public Sans",
                      fontSize: 18,
                      fontWeight: 400,
                    }}
                    gutterBottom
                  >
                    {product?.description}
                  </Typography>
                  <Divider />

                  <Outlet />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              direction="column"
              spacing={3}
              md={3}
              sm={5}
              xs={12}
            >
              <Grid item>
                <Paper
                  variant="outlined"
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    boxShadow:
                      "-6px 8px 28px 0 rgba(0, 0, 0, 0.06), -2px 0 4px 0 rgba(0, 0, 0, 0.01), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <SellerCard
                    name={product?.displayName}
                    avatar={product?.avatar}
                    isOwner={product?.uid === uid}
                  />
                </Paper>
              </Grid>
              <Grid item style={{ width: "100%" }}>
                <Map height="30vh" />
              </Grid>
            </Grid>
            {/* <Button
                  onClick={() => {
                    navigate("discussion");
                  }}
                >
                  Make Offer
                </Button> */}
          </Grid>

          {/* <img 
                  src={require(`./wood1.jpg`)}
                  alt="woodSomething"
                  width="40"
                  height="40"
                  align="left"
              /> */}
        </Container>

        <div>
          {/* <Outlet /> */}

          {/* <MaterialMap /> */}
        </div>
      </>
    )
  );
};

export default ProductView;
