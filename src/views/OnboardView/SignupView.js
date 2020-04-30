import { Box, Button, Container, Divider, Snackbar } from "@material-ui/core";
import { ArrowBack as BackIcon } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import React from "react";
import { useNavigate } from "react-router-dom";

import OnboardLayout from "./OnboardLayout";
import SignupForm from "./SignupForm";

const SignupView = () => {
  const [authError, setAuthError] = React.useState(null);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAuthError(false);
  };

  const navigate = useNavigate();
  return (
    <Container
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <OnboardLayout
        header="Create an Account"
        subtitle="Enter your details to become apart of the materials marketplace"
        form={<SignupForm setAuthError={setAuthError} />}
        actions={
          <>
            <Box mb="20px" mt="30px">
              <Divider light />
            </Box>
            <Button
              startIcon={<BackIcon style={{}} />}
              variant="outlined"
              onClick={() => navigate("/login")}
              color="primary"
              label="Login"
              primary={true}
              style={{
                textTransform: "none",
                width: "187.54px",
                margin: "0px 0px 50px 0px",
                padding: "8px",
              }}
            >
              Go back to login
            </Button>
          </>
        }
      />

      <Snackbar open={authError} autoHideDuration={4000} onClose={handleClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="error"
        >
          {authError}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default SignupView;
