import React from "react";

import { auth, uiConfig } from "firebase/core";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import EmailIcon from "@material-ui/icons/Email";

import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

import {
  Paper,
  Card,
  Typography,
  TextField,
  Link,
  Button,
  Grid,
  useTheme,
  Box,
  makeStyles,
  LinearProgress,
  Chip,
  Divider,
  Snackbar,
  InputBase,
  InputLabel
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import styled from "styled-components";
import useForm from "react-hook-form";
import {
  ExpandMore as DownIcon,
  ArrowBack as BackIcon
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  fieldsContainer: {
    display: "flex",
    flexDirection: "column"
  },
  paper: {
    padding: theme.spacing(1.5)
  },
  textField: {
    margin: theme.spacing(1)
  }
}));

const LoginContainer = styled(Paper)`
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
    <>
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
    </>
  );
};

const LoginPage = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = React.useState([]);
  const [authError, setAuthError] = React.useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAuthError(false);
  };
  const [state, setState] = React.useState("LOGIN");

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignContent="center"
    >
      <LoginContainer
        component={Grid}
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        {state === "LOGIN" ? (
          <OnboardLayout
            header="Welcome Back"
            subtitle="Please login to your account"
            form={
              <LoginForm setAuthError={setAuthError} authError={authError} />
            }
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
                <Button
                  startIcon={<EmailIcon style={{ marginRight: "8px" }} />}
                  variant="contained"
                  color="primary"
                  label="Login"
                  primary={true}
                  onClick={() => {
                    setState("REGISTER");
                  }}
                  style={{
                    textTransform: "none",
                    width: "187.54px",
                    margin: "0px 24px",
                    padding: "8px"
                  }}
                >
                  Sign up with Email
                </Button>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
              </>
            }
          />
        ) : (
          <OnboardLayout
            header="Create an Account"
            subtitle="Enter your details to begin submitting and evaluating ideas"
            form={<SignupForm setAuthError={setAuthError} />}
            actions={
              <>
                <Box mb="20px" mt="30px">
                  <Divider light />
                </Box>
                <Button
                  startIcon={<BackIcon style={{}} />}
                  variant="outlined"
                  onClick={() => setState("LOGIN")}
                  color="primary"
                  label="Login"
                  primary={true}
                  style={{
                    textTransform: "none",
                    width: "187.54px",
                    margin: "0px 0px 50px 0px",
                    padding: "8px"
                  }}
                >
                  Go back to login
                </Button>
              </>
            }
          />
        )}
        <Snackbar
          open={authError}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity="error"
          >
            {authError}
          </MuiAlert>
        </Snackbar>
      </LoginContainer>
    </Box>
  );
};

export default LoginPage;
