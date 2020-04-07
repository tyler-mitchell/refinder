import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate, Outlet } from "react-router-dom";
import { Button, Box, Container } from "@material-ui/core";
const SellerDashboard = () => {
  const navigate = useNavigate();
  return (
    <Container style={{ padding: "30px", height: "100%" }}>
      <Box mt={"10px"} display="flex">
        <Box flexGrow={1} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("new");
          }}
        >
          New Product
        </Button>
      </Box>
      <Outlet />
    </Container>
  );
};

export default SellerDashboard;
