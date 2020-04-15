import React from "react";
import {
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
const PleaseLoginMessage = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader
        title={<span style={{ fontWeight: 600 }}>Please Login</span>}
      />

      <CardContent>
        <Typography variant="body1">
          To create a product and contact sellers, you must create an account.
        </Typography>
      </CardContent>
      <CardActions>
        <div style={{ flexGrow: 1 }} />
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
      </CardActions>
    </Card>
  );
};

export default PleaseLoginMessage;
