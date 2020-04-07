import React from "react";
import styled from "styled-components";
import Field from "components/Fields/TextField";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import './index.css'
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import NextIcon from "@material-ui/icons/ArrowForwardRounded";
import CloseIcon from "@material-ui/icons/CloseRounded";
import FormContainer from "../../components/Fields/FormContainer";
import { useNavigate } from "react-router-dom";

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
  CircularProgress,
  DialogContent,
  DialogActions,
  DialogTitle,
  IconButton,
  Toolbar,
  Button as MuiButton,
} from "@material-ui/core";

import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import ProductSteps from "./ProductSteps";
import FormContextProvider, { FormContext } from "./FormContext";

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

const CreateProductView = () => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    triggerValidation,
    errors,
    register,
    formState,
    getValues,
    control,
    handleFileUpload,
    onSubmit,
    activeStep,
    setActiveStep,
    formSteps,
    completedSteps,
    uploading,
    error,
    modalOpen,
    setModalOpen,
  } = React.useContext(FormContext);

  const classes = styles();
  const containerRef = React.useRef();
  const location = useLocation();
  console.log(`⭐: CreateProductView -> location`, location);
  const navigate = useNavigate();

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
        open={modalOpen}
        closeAfterTransition
        // transitionDuration={{ appear: 3000, exit: 3000, enter: 3000 }}
        onExited={() => {
          navigate("../");
        }}
        style={{ overflow: "visible" }}
        PaperProps={{ style: { overflow: "visible" } }}
        scroll="body"
        ref={containerRef}
      >
        <IconButton
          style={{ position: "absolute", top: 2, right: 2 }}
          size="small"
          onClick={() => {
            // navigate("../");
            setModalOpen(false);
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "flex" }}>
            <Drawer
              open={true}
              hideBackdrop={true}
              variant="permanent"
              PaperProps={{
                style: {
                  position: "relative",
                  userSelect: "none",
                  borderTopLeftRadius: "15px",
                },
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
                style={{
                  overflow: "visible",
                  height: "60vh",
                  width: "100%",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    display: "flex",

                    height: "100%",
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
              endIcon={
                uploading ? (
                  <CircularProgress size={20} thickness={5} />
                ) : (
                  <NextIcon />
                )
              }
              type="submit"
              onClick={() => {}}
              disabled={uploading}
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
