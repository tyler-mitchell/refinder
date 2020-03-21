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

const OnboardContainer = styled(Paper)`
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
        <OnboardContainer component={Grid}
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            spacing={2}>
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
        </OnboardContainer>
    );
};



export default OnboardLayout;
