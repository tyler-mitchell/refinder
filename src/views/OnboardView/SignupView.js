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
    Container,
    InputLabel
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import styled from "styled-components";
import useForm from "react-hook-form";
import OnboardLayout from './OnboardLayout';
import { useNavigate } from 'react-router-dom';
import {
    ExpandMore as DownIcon,
    ArrowBack as BackIcon
} from "@material-ui/icons";




const SignupView = () => {
    const [authError, setAuthError] = React.useState(null);
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAuthError(false);
    };

    const navigate = useNavigate()
    return (
        <Container
            style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}
        >

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
                            onClick={() => navigate("/login")}
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

        </Container>
    );
};

export default SignupView;
