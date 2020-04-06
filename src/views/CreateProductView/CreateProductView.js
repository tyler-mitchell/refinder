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
  Content,
} from "@mui-treasury/layout";
import {
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  makeStyles,
  AppBar,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Toolbar,
  Button as MuiButton,
} from "@material-ui/core";

import {
  addToForm,
  formDataSelector,
  addToFirebase,
} from "redux/createProductSlice";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import ProductSteps from "./ProductSteps";
import FormContextProvider, { FormContext } from "./FormContext";
const form = {
  "default-text-field": "Test Data",
  "default-email-field": "info@example.com",
  "number-text-field": 6,
};

const drawerWidth = 240;
const useStyles = makeStyles(() => ({
  header: {
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, .10)",
    backgroundColor: "#ffffff",
  },
  insetBody: {
    borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
    overflowY: "auto",
  },
  insetDrawerPaper: {
    width: "100%",
    maxWidth: 300,
  },
  contentContainer: {
    flex: 1,
    minHeight: 0,
  },
  content: {
    maxHeight: "100%",
    overflowY: "auto",
  },
  footer: {
    height: 52,
    display: "flex",
    alignItems: "center",
    border: "none",
    padding: "0 8px",
  },

  edit: {
    backgroundColor: "rgba(0,0,0,0.04)",
  },
}));

const styles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  modal: {
    paddingLeft: 50,
  },
  paper: {
    right: 0,
    paddingLeft: 50,
  },
}));

const formSteps = [
  "General Details",
  "Upload Photos",
  "Location",
  "Price and Payment",
];
const TOTAL_STEPS = formSteps.length;
const CreateProductView = () => {
  const dispatch = useDispatch();
  const formData = useSelector((s) => s.auth.uid);
  const [completedSteps, setCompletedSteps] = React.useState(0);
  function onSubmit(values) {
    if (activeStep < TOTAL_STEPS) {
      setActiveStep(activeStep + 1);
      setCompletedSteps(activeStep);
    }
    dispatch(addToForm({ formData: values }));

    console.log(`⭐: CreateProductView -> formData`, formData);

    if (activeStep === TOTAL_STEPS) {
      dispatch(addToFirebase(formData));
    }
  }

  const {
    handleSubmit,
    triggerValidation,
    errors,
    register,
    formState,
    control,
  } = React.useContext(FormContext);

  const classes = styles();
  const containerRef = React.useRef();
  const location = useLocation();
  console.log(`⭐: CreateProductView -> location`, location);
  const [activeStep, setActiveStep] = React.useState(1);

  return (
    <div
      style={{
        position: "relative",
        height: "calc(100vh - 64px)",
        width: "100%",
        padding: "30px",
      }}
    >
      <Dialog
        fullWidth
        maxWidth="md"
        open={true}
        style={{ overflow: "visible" }}
        PaperProps={{ style: { overflow: "visible" } }}
        scroll="body"
        ref={containerRef}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "flex" }}>
            <Drawer
              open={true}
              hideBackdrop={true}
              variant="permanent"
              PaperProps={{
                style: { position: "relative", userSelect: "none" },
              }}
              BackdropProps={{ style: { position: "relative" } }}
              ModalProps={{
                container: document.getElementById("drawer-c"),
                style: { position: "relative" },
              }}
            >
              <Grid item style={{ height: "100%" }}>
                <List style={{ height: "100%" }}>
                  {formSteps.map((text, index) => (
                    <ListItem
                      button={index < completedSteps + 1}
                      key={text}
                      selected={index + 1 === activeStep}
                      onClick={() => {
                        if (index + 1 < completedSteps) {
                          setActiveStep(index + 1);
                        }
                      }}
                    >
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                  <div style={{ flexGrow: 1 }} />
                </List>
              </Grid>
            </Drawer>
            <div style={{ width: "100%" }}>
              <DialogTitle>{formSteps[activeStep - 1]}</DialogTitle>
              <DialogContent
                id="drawer-c"
                style={{ overflow: "visible", height: "60vh", width: "100%" }}
              >
                <div
                  style={{
                    position: "relative",
                    display: "flex",

                    // height: "100%",
                    justifyContent: "center",

                    width: "100%",

                    background: "white",
                  }}
                >
                  <ProductSteps activeStep={activeStep} />
                </div>
              </DialogContent>
            </div>
          </div>
          <Divider />
          <DialogActions>
            <MuiButton
              onClick={() => {
                if (activeStep > 1) {
                  setActiveStep(activeStep - 1);
                }
              }}
              variant="outlined"
              variantColor="blue"
            >
              Back
            </MuiButton>
            <MuiButton
              type="submit"
              onClick={() => {}}
              variant="outlined"
              variantColor="blue"
            >
              Next
            </MuiButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

const CreateProductViewContextWrap = () => {
  return (
    <FormContextProvider>
      <CreateProductView />
    </FormContextProvider>
  );
};

export default CreateProductViewContextWrap;
