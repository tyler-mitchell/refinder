import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  fieldsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    padding: theme.spacing(1.5),
  },
  textField: {
    margin: theme.spacing(1),
  },
}));

const OnboardContainer = styled(Paper)`
  margin-top: 20px;
  margin-bottom: 50px;
  min-height: 80vh;
  width: 500px;
  height: auto;
  transition: all 2s ease;
  border-radius: 23px;
`;

const OnboardLayout = ({ header, subtitle, form, actions }) => {
  return (
    <OnboardContainer
      component={Grid}
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Grid item style={{ marginTop: "80px" }}>
        <Typography variant="h5" component="h3">
          {header}
        </Typography>
      </Grid>

      <Grid item style={{ marginBottom: "20px" }}>
        <Typography
          align="center"
          color="textSecondary"
          variant="subtitle2"
          style={{ width: "300px" }}
        >
          {subtitle}
        </Typography>
      </Grid>

      <Grid item style={{ width: "100%", padding: "0px 75px" }}>
        {form}
      </Grid>

      <Grid item>{actions}</Grid>
    </OnboardContainer>
  );
};

export default OnboardLayout;
