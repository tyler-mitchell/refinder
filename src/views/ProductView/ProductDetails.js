import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";

const Price = () => {
  return (
    <>
      <Typography variant="h6">$ 150 / lb </Typography>
    </>
  );
};

const DetailItem = ({ title, detail }) => {
  return (
    <Grid item style={{ width: "30%" }}>
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
        <Price />
      ) : (
        <Typography variant="body1">{detail}</Typography>
      )}
    </Grid>
  );
};

const ProductDetails = () => {
  return (
    <Grid container item direction="column" justify="space-between" spacing={2}>
      <Grid item container justify="space-between" alignItems="center">
        <DetailItem title="Quality" detail="Good" />
        <DetailItem title="Price" detail="$78" />
      </Grid>
      <Grid item container justify="space-between">
        <DetailItem title="Unit" detail="200lbs" />
        <DetailItem title="Type" detail="Wood" />
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
