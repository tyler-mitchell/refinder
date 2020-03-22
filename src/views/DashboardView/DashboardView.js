import React from "react";
import { Typography, Container, Link } from "@material-ui/core";
const DashboardView = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant={"overline"}>Welcome to</Typography>
      <Typography weight={"bold"} variant={"h4"} gutterBottom>
        <Link underline={"none"}>Refinder </Link> Marketplace
      </Typography>
    </Container>
  );
};

export default DashboardView;
