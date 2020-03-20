import React from "react";
import styled from "styled-components";
import Field from "components/Fields/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import './index.css'
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import FormContainer from "../../components/Fields/FormContainer";
import {
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  makeStyles
} from "@material-ui/core";
const form = {
  "default-text-field": "Test Data",
  "default-email-field": "info@example.com",
  "number-text-field": 6
};

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));
const SellView = () => {
  function handleSubmit(e) {
    console.log("SELL", e);
  }
  const classes = useStyles();
  return (
    <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
      <Grid
        container
        wrap="nowrap"
        justify="flex-start"
        spacing={3}
        style={{ height: "100%" }}
      >
        <Grid item style={{ height: "100%" }}>
          <List style={{ height: "100%" }}>
            {["General Details", "Location", "Price and Payment", "Drafts"].map(
              (text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
            <div style={{ flexGrow: 1 }} />
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid container item direction="column" xs={5}>
          <FormContainer
            defaultValues={form}
            onSuccess={handleSubmit}
            FormProps={{
              "aria-autocomplete": "none",
              autoComplete: "new-password"
            }}
            onSubmit={handleSubmit}
          >
            <Grid item />
            <Grid item>
              <Typography variant="h4">General Details</Typography>
            </Grid>
            <Grid item />

            <Grid item>
              <Field
                required
                // margin={"dense"}
                fullWidth
                label="What's the product name?"
                name={"default-email-field"}
              />
            </Grid>

            <Grid item>
              <Field
                label={"Describe the product in detail"}
                fullWidth
                multiline
                rowsMin={5}
                rowsMax={5}
                rows={5}
                name={"number-text-field"}
                required
                type={"number"}
              />
            </Grid>

            <Button color="primary" type="submit" variant="contained">
              Test theme
            </Button>
          </FormContainer>
        </Grid>
      </Grid>
      <div style={{ flex: "1 1 auto", display: "flex" }} />
    </div>
  );
};

export default SellView;
