import React from "react";
import {
  Toolbar,
  CssBaseline,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  makeStyles,
  GridList,
  Divider,
  Box,
  Grid,
  GridListTile,
  IconButton,
  Container,
} from "@material-ui/core";
import MaterialMap from "components/Map";
import ChatWindow from "components/Chat";
import {
  useParams,
  useLocation,
  useNavigate,
  Outlet,
  useOutlet,
} from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { database } from "firebase/core";
import { initializeProduct } from "redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductImages from "./ProductImages";
import SellerCard from "components/SellerCard";
import Map from "components/Map";
import ProductDetails from "./ProductDetails";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteIconFilled from "@material-ui/icons/FavoriteRounded";
import MoreOptionsIcon from "@material-ui/icons/MoreHorizRounded";
import ShareIcon from "@material-ui/icons/ShareRounded";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const ProductView = () => {
  let { materialID } = useParams();
  let navigate = useNavigate();
  const location = useLocation();
  const productInfo = useSelector((state) => state.message);

  const productRef = database.doc(`materials/${materialID}`);
  const dispatch = useDispatch();
  const [product, loading, error] = useDocumentData(productRef, {
    idField: "productId",
  });
  console.log(`⭐: ProductView -> product`, product);

  React.useEffect(() => {
    if (!loading) {
      dispatch(initializeProduct({ ...product }));
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
        {/* <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab value="" label="Product Detail" />
            <Tab value="discussion" label="Offer" />
          </Tabs>
        </Paper> */}
        <Container maxWidth="lg" style={{ padding: "30px" }}>
          <Grid
            container
            // spacing={3}
            style={{ background: "white" }}
            item
            justify="space-between"
            // alignContent="stretch"
            // xs={5}
          >
            <Grid item container xs={9} spacing={2}>
              <Grid item xs={6}>
                <ProductImages
                  productImages={
                    product?.productImages ?? [{ downloadUrl: "" }]
                  }
                />
              </Grid>
              <Grid container item direction="column" xs={6}>
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
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    style={{ fontWeight: "bold" }}
                    gutterBottom
                  >
                    29103 Flying Arrow
                  </Typography>
                </Grid>
                <Divider />
                <Box mb="15px" />
                <Grid item>
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
                  <Box mb="15px" />
                  <ProductDetails />
                  <Outlet />
                </Grid>
              </Grid>
            </Grid>

            <Grid item container direction="column" spacing={3} xs={3}>
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
                  <SellerCard name={product?.displayName} />
                </Paper>
              </Grid>
              <Grid item style={{ width: "100%" }}>
                <Map />
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
