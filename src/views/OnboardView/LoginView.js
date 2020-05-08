import {
  Box,
  Button,
  Container,
  Divider,
  Snackbar,
  Typography,
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import MuiAlert from "@material-ui/lab/Alert";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useNavigate } from "react-router-dom";

import { auth, uiConfig } from "firebase/core";

import LoginForm from "./LoginForm";
import OnboardLayout from "./OnboardLayout";

const LoginPage = () => {
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
        header="Welcome Back"
        subtitle="Please login to your account"
        form={<LoginForm setAuthError={setAuthError} authError={authError} />}
        actions={
          <>
            <Box
              display="flex"
              alignItems="center"
              marginBottom="10px"
              marginTop="30px"
            >
              <Divider style={{ width: "45%" }} />
              <Typography
                variant="subtitle2"
                color="textSecondary"
                style={{ margin: "0px 5px" }}
              >
                OR
              </Typography>
              <Divider style={{ width: "45%" }} />
            </Box>
            {/* <Button
              startIcon={<EmailIcon style={{ marginRight: "8px" }} />}
              variant="contained"
              color="primary"
              label="Login"
              onClick={() => navigate("/signup")}
              style={{
                textTransform: "none",
                width: "187.54px",
                margin: "0px 24px",
                padding: "8px",
              }}
            >
              Sign up with Email
            </Button> */}
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
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

export default LoginPage;
