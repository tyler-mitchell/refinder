import React from "react";
import styled from "styled-components";
import Field from "components/Fields/TextField";

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
import {
  ThemeProvider,
  CSSReset,
  theme,
  Box,
  Accordion,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Flex,
  Button,
  FormHelperText,
  Heading
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
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
  const classes = useStyles();
  function onSubmit(values) {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
    }, 1000);
  }
  const { handleSubmit, errors, register, formState } = useForm();

  return (
    <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
      <Grid
        container
        wrap="nowrap"
        justify="flex-start"
        spacing={5}
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
        <Grid style={{ display: "flex" }} item>
          <Divider orientation="vertical" flexItem />
        </Grid>
        <Grid container item direction="column" xs={5}>
          <ThemeProvider theme={theme}>
            <CSSReset />
            <SimpleGrid columns={1} spacingX={1} spacingY={5}>
              <Heading>General Details</Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.name} isRequired>
                  <FormLabel>What's the product name?</FormLabel>
                  <Input name="title" ref={register({ required: true })} />

                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="description">
                    Describe the product in detail
                  </FormLabel>
                  <Textarea name="description" />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>

                <Flex
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  flexDirection="row"
                >
                  <Button type="submit" variant="outline" variantColor="blue">
                    Next
                  </Button>
                </Flex>
              </form>
            </SimpleGrid>
          </ThemeProvider>
        </Grid>
      </Grid>
      <div style={{ flex: "1 1 auto", display: "flex" }} />
    </div>
  );
};

export default SellView;
