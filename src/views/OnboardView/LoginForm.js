import React from "react";

import firebase from "firebase";

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
  InputBase,
  InputLabel
} from "@material-ui/core";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  ExpandMore as DownIcon,
  ArrowBack as BackIcon
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
const StrengthLevels = {
  WEAK: { text: "weak", color: "#b3201c", num: 25 },
  AVERAGE: { text: "average", color: "#ffc512", num: 50 },
  STRONG: { text: "strong", color: "#25a75d", num: 100 }
};

const useProgressBarStyles = makeStyles({
  root: {
    marginTop: "8px",
    borderRadius: "5px",
    background: "transparent"
  },
  weak: {
    backgroundColor: StrengthLevels.WEAK.color
  },
  average: {
    backgroundColor: StrengthLevels.AVERAGE.color
  },
  strong: {
    backgroundColor: StrengthLevels.STRONG.color
  }
});
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justiyContent: "center"
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
  margin-top: 90px;
  margin-bottom: 300px;

  width: 350px;
  height: 350px;
  border-radius: 30px;
`;

const textFields = [
  { name: "first_name", label: "First Name", default: "" },
  { name: "last_name", label: "Last Name", default: "" },
  { name: "city", label: "City", default: "" }
];
const LoginForm = ({ setAuthError, authError }) => {
  const classes = useStyles();
  const progressStyles = useProgressBarStyles();

  // const { loginUser, userData } = React.useContext(FirebaseContext);
  let history = useNavigate();

  // React.useEffect(() => {
  //   if (userData.user) {
  //     history.push('/feed')
  //   }
  // }, [userData])
  const { register, handleSubmit, errors, watch, setError } = useForm({
    defaultValues: {
      password: ""
    }
  });
  const hasError = inputName => {
    return !!(errors && errors[inputName]);
  };
  const password = watch("password");
  const passwordStrength = React.useMemo(
    () => calculatePasswordStrength(password),
    [password]
  );

  function calculatePasswordStrength(password) {
    if (password.length > 10) {
      return StrengthLevels.STRONG;
    }

    if (password.length > 5) {
      return StrengthLevels.AVERAGE;
    }
    if (password.length === 0) {
      return "";
    }
    return StrengthLevels.WEAK;
  }

  const onSubmit = data => {
    // loginUser(data.email, data.password, redirect);
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then(res => {
            // if (res.user) Auth.setLoggedIn(true);
            // history.push('/reports')

            history.push("/feed");
          })
          .catch(e => {
            setAuthError(e.message);
          });
      });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Grid
        direction="column"
        justify="center"
        container
        spacing={2}
        style={{ marginBottom: "15px" }}
      >
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            fullWidth
            type="email"
            inputRef={register({
              required: true,

              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format"
              }
            })}
            error={hasError("email") || authError}
            helperText={hasError("email") && errors["email"].message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            label="password"
            fullWidth
            type="password"
            inputRef={register({
              required: true
            })}
            error={hasError("password") || authError}
            helperText={hasError("password") && errors["password"].message}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        // startIcon={<CreateAccountIcon style={{}} />}
        variant="contained"
        color="primary"
        label="Login"
        style={{
          textTransform: "none",
          width: "100%",
          padding: "8px"
        }}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
