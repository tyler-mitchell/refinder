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
  InsetContainer,
  Sidebar,
  InsetSidebar,
  SecondarySidebar,
  Content
} from "@mui-treasury/layout";
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
import {
  addToForm,
  formDataSelector,
  addToFirebase
} from "redux/createProductSlice";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
const form = {
  "default-text-field": "Test Data",
  "default-email-field": "info@example.com",
  "number-text-field": 6
};

const drawerWidth = 240;
const useStyles = makeStyles(() => ({
  header: {
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, .10)",
    backgroundColor: "#ffffff"
  },
  insetBody: {
    borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
    overflowY: "auto"
  },
  insetDrawerPaper: {
    width: "100%",
    maxWidth: 300
  },
  contentContainer: {
    flex: 1,
    minHeight: 0
  },
  content: {
    maxHeight: "100%",
    overflowY: "auto"
  },
  footer: {
    height: 52,
    display: "flex",
    alignItems: "center",
    border: "none",
    padding: "0 8px"
  },
  edit: {
    backgroundColor: "rgba(0,0,0,0.04)"
  }
}));

const styles = makeStyles(theme => ({
  root: {
    marginLeft: 70
  },
  modal: {
    paddingLeft: 50
  },
  paper: {
    right: 0,
    paddingLeft: 50
  }
}));
const CreateProductView = () => {
  const dispatch = useDispatch();
  const formData = useSelector(s => s.auth.uid);
  function onSubmit(values) {
    dispatch(addToForm({ formData: values }));
    console.log(`⭐: CreateProductView -> formData`, formData);
    dispatch(addToFirebase(formData));
  }
  const { handleSubmit, errors, register, formState } = useForm();

  const classes = styles();
  return (
    <>
      <InsetContainer>
        <SecondarySidebar
          side="left"
          open={false}
          // hideBackdrop={false}
          PaperProps={{
            container: () => null,
            classes: {
              root: classes.root
            }
          }}
          ModalProps={{
            classes: {
              root: classes.root
            },
            container: () => null
          }}
        >
          <Grid item style={{ height: "100%" }}>
            <List style={{ height: "100%" }}>
              {[
                "General Details",
                "Location",
                "Price and Payment",
                "Drafts"
              ].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
              <div style={{ flexGrow: 1 }} />
            </List>
          </Grid>
        </SecondarySidebar>

        <Content>
          <Box display="flex" height="100%">
            <Grid
              container
              wrap="nowrap"
              justify="flex-start"
              spacing={5}
              style={{ height: "100%" }}
            >
              <Grid style={{ display: "flex" }} item>
                {/* <Divider orientation="vertical" flexItem /> */}
              </Grid>
              <Grid container item direction="column" xs={5}>
                <ThemeProvider theme={theme}>
                  {/* <CSSReset /> */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <SimpleGrid columns={1} spacingX={1} spacingY={4}>
                      <Heading>General Details</Heading>

                      <FormControl isInvalid={errors.name} isRequired>
                        <FormLabel>What's the product name?</FormLabel>
                        <Input
                          name="title"
                          ref={register({ required: true })}
                        />

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
                        <Button
                          type="submit"
                          variant="outline"
                          variantColor="blue"
                        >
                          Create
                        </Button>
                      </Flex>
                    </SimpleGrid>
                  </form>
                </ThemeProvider>
              </Grid>
            </Grid>
          </Box>
        </Content>
      </InsetContainer>
    </>
  );
};

export default CreateProductView;
