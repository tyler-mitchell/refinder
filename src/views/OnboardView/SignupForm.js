import {
  Button,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import CreateAccountIcon from "@material-ui/icons/PersonAdd";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const StrengthLevels = {
  WEAK: { text: "weak", color: "#b3201c", num: 25 },
  AVERAGE: { text: "average", color: "#ffc512", num: 50 },
  STRONG: { text: "strong", color: "#25a75d", num: 100 },
};

const useProgressBarStyles = makeStyles({
  root: {
    marginTop: "8px",
    borderRadius: "5px",
    background: "transparent",
  },
  weak: {
    backgroundColor: StrengthLevels.WEAK.color,
  },
  average: {
    backgroundColor: StrengthLevels.AVERAGE.color,
  },
  strong: {
    backgroundColor: StrengthLevels.STRONG.color,
  },
});

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justiyContent: "center",
  },
  fieldsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    padding: theme.spacing(1.5),
  },
  textField: {
    margin: theme.spacing(1),
  },
}));

const SignupForm = ({ setAuthError }) => {
  let history = useNavigate();
  const classes = useStyles();
  const progressStyles = useProgressBarStyles();

  const [signupError, setSignupError] = React.useState(null);
  // const { signupUser } = React.useContext(FirebaseContext);

  const { register, handleSubmit, errors, watch, setError } = useForm({
    defaultValues: {
      password: "",
    },
  });
  const hasError = (inputName) => {
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

  const onSubmit = (data) => {
    const { password, ...userInfo } = data;

    // signupUser(userInfo, password, setAuthError, history);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Grid
        direction="column"
        justify="center"
        container
        spacing={2}
        style={{ marginBottom: "15px" }}
      >
        <Grid container item justify="space-between" xs={12}>
          <Grid item xs={5}>
            <TextField
              name="first_name"
              label="First Name"
              fullWidth
              // className={classes.textField}
              inputRef={register({
                required: "First Name is required",
                minLength: {
                  value: 2,
                  message: "Minimum of 2 characters in length",
                },
              })}
              error={hasError("first_name")}
              helperText={
                hasError("first_name") && errors["first_name"].message
              }
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              name="last_name"
              label="Last Name"
              fullWidth
              // className={classes.textField}
              inputRef={register({
                required: "Last Name is required",
                minLength: {
                  value: 2,
                  message: "Minimum of 2 characters in length",
                },
              })}
              error={hasError("last_name")}
              helperText={hasError("last_name") && errors["last_name"].message}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            // className={classes.textField}
            fullWidth
            placeholder="email@example.com"
            type="email"
            inputRef={register({
              required: "Email is required",

              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            error={hasError("email") || signupError}
            helperText={hasError("email") && errors["email"].message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            inputRef={register({
              required: "Password is required",
              validate: () => {
                return (
                  passwordStrength.text !== StrengthLevels.WEAK.text ||
                  "Too weak"
                );
              },
            })}
            error={hasError("password")}
            helperText={
              password && (
                <Paper style={{ padding: "8px" }}>
                  {passwordStrength.text === StrengthLevels.WEAK.text && (
                    <Typography variant="caption" color="textSecondary">
                      Minimum of 6 characters in length
                    </Typography>
                  )}
                  <Typography variant="subtitle2" color="textPrimary">
                    Password strength:{" "}
                    <span
                      style={{
                        color: `${passwordStrength.color}`,
                        fontWeight: "bold",
                      }}
                    >
                      {passwordStrength.text}
                    </span>
                  </Typography>
                  <LinearProgress
                    classes={{
                      root: progressStyles.root,
                      barColorPrimary: progressStyles[passwordStrength.text],
                    }}
                    variant="determinate"
                    value={passwordStrength.num}
                  />
                </Paper>
              )
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="confirm_password"
            label="Confirm Password"
            type="password"
            // variant="outlined"
            // className={classes.textField}
            fullWidth
            inputRef={register({
              required: true,
              validate: (value) =>
                value === watch("password") || "passwords do not match",
            })}
            error={hasError("confirm_password")}
            helperText={
              hasError("confirm_password") && errors["confirm_password"].message
            }
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        startIcon={<CreateAccountIcon />}
        variant="contained"
        color="primary"
        label="Login"
        primary={true}
        style={{
          textTransform: "none",
          width: "100%",
          margin: "0px 24px",
          padding: "8px",
        }}
      >
        Create Account
      </Button>
    </form>
  );
};

export default SignupForm;
