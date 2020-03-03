import React, { useState } from "react";
import { TextField, Grid, Button } from '@material-ui/core';

import {
  Content,
} from "@mui-treasury/layout";


const Login = props => {
  return (
    <Content style={{ justiyfItems: 'center' }}>
      <Grid justify="center" style={{ marginTop: '30px' }} container direction="column" spacing={3}>
        <Grid item><TextField id="username" label="Username" variant="outlined" /></Grid>
        <Grid item><TextField type='password' id="password" label="Password" variant="outlined" /></Grid>
        <Grid item><Button variant="contained">Login</Button></Grid>
      </Grid>
    </Content>

  );
};


export default Login;


