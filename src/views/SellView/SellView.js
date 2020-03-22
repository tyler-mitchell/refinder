import React from "react";
import styled from "styled-components";
import Field from "components/Fields/TextField";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import './index.css'
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import FormContainer from "../../components/Fields/FormContainer";
import { InsetContainer } from "@mui-treasury/layout";
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
import { addToForm, formDataSelector } from "redux/sellSlice";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
const form = {
  "default-text-field": "Test Data",
  "default-email-field": "info@example.com",
  "number-text-field": 6
};

const drawerWidth = 240;

const SellView = () => {
  const dispatch = useDispatch();
  const formData = useSelector(s => s.sell);
  function onSubmit(values) {
    dispatch(addToForm({ formData: values }));

    setTimeout(() => {
      alert(JSON.stringify(formData));
    }, 1000);
  }
  const { handleSubmit, errors, register, formState } = useForm();

  return (
    <Box display="flex" height="100%">
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
            {/* <CSSReset /> */}
            <SimpleGrid columns={1} spacingX={1} spacingY={3}>
              <Heading>General Details</Heading>
              <h2>formdata: {JSON.stringify(formData)}</h2>
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
                  <Textarea
                    name="description"
                    ref={register({ required: true })}
                  />
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
    </Box>
  );
};

export default SellView;
