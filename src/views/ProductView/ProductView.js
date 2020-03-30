import React from "react";
import {
  Toolbar,
  CssBaseline,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  makeStyles
} from "@material-ui/core";
import MaterialMap from "components/Map";
import ChatWindow from "components/Chat";
import {
  useParams,
  useLocation,
  useNavigate,
  Outlet,
  useOutlet
} from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { database } from "firebase/core";
import { initializeProduct } from "redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const ProductView = () => {
  let { materialID } = useParams();
  let navigate = useNavigate();
  const location = useLocation();
  const productInfo = useSelector(state => state.message);

  const productRef = database.doc(`materials/${materialID}`);
  const dispatch = useDispatch();
  const [product, loading, error] = useDocumentData(productRef, {
    idField: "productId"
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
        <Paper className={classes.root}>
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
        </Paper>
        <div>
          <Typography variant="h3">{product?.title}</Typography>
          <Button
            onClick={() => {
              navigate("discussion");
            }}
          >
            Make Offer
          </Button>
          {/* <img 
                src={require(`./wood1.jpg`)}
                alt="woodSomething"
                width="40"
                height="40"
                align="left"
            /> */}
        </div>

        <div>
          <Outlet />

          {/* <MaterialMap /> */}
        </div>
      </>
    )
  );
};

export default ProductView;
