import React from "react";
import { Grid, Typography, Divider, IconButton } from "@material-ui/core";
import PlusIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";
const Price = () => {
  return (
    <>
      <Typography variant="h6">$ 150 </Typography>
    </>
  );
};

const Quantity = () => {
  const [count, setCount] = React.useState(1);
  return (
    <>
      <div
        style={{
          display: "flex",
          // justifyContent: "center",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton style={{ fontSize: 18 }}>
          <MinusIcon fontSize="inherit" />
        </IconButton>
        <Typography style={{ fontSize: 24, fontWeight: 500 }}>
          {count}
        </Typography>
        <IconButton edge="end" style={{ fontSize: 19 }}>
          <PlusIcon fontSize="inherit" />
        </IconButton>
      </div>
    </>
  );
};

const DetailItem = ({ title, detail }) => {
  return (
    <Grid item container direction="column" style={{ width: "30%" }}>
      <Typography
        variant="subtitle2"
        // color="textSecondary"
        style={{
          fontWeight: "bold",
          fontFamily: "Public Sans",
          fontSize: 19,
        }}
        gutterBottom
      >
        {title}
      </Typography>
      <Divider />
      {title === "Price" ? (
        <>
          <Price />
          <Quantity />
        </>
      ) : (
        <Typography variant="body1">{detail}</Typography>
      )}
    </Grid>
  );
};

const ProductDetails = () => {
  return (
    <Grid container item direction="column" justify="space-between" spacing={2}>
      <Grid item container justify="space-between" alignItems="flex-start">
        <DetailItem title="Price" detail="$78" />
        <DetailItem title="Quality" detail="Good" />
      </Grid>
      <Grid item container justify="space-between">
        <DetailItem title="Unit" detail="200lbs" />
        <DetailItem title="Type" detail="Wood" />
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
