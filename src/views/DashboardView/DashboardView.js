import React from "react";
import { Typography, Container, Link, Grid } from "@material-ui/core";
import Map from "components/Map/MapBoxWrap";
const DashboardView = () => {
  return (
    <Container maxWidth="md">
      <Map />
    </Container>
  );
};

export default DashboardView;
