import React, { useState } from "react";
import { Grid, Button} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PasswordField from 'material-ui-password-field'
import {
  Content,
} from "@mui-treasury/layout";

  

const SignUp = props => {
  return (
    <Content style={{ justiyfItems: 'center' }}>
      <Grid justify="center" style={{ marginTop: '30px' }} container direction="column" spacing={3}>

        <Grid item><TextField id="email" label="Email" variant="outlined" /></Grid>
        <Grid item><TextField id="username" label="Username" variant="outlined" /></Grid>
        <Grid item><TextField type='password' id="password" label="Password" variant="outlined" /></Grid>

        <Grid item><Button variant="contained">Sign Up</Button></Grid>
      </Grid>
    </Content>

  );
};


export default SignUp;


