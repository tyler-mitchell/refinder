import React from "react";
import {
  Card,
  Grid,
  CardMedia,
  Container,
  Fab,
  Box,
  InputBase,
  IconButton,
  Typography,
  CardContent
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import { database } from "firebase/core";
import { motion, AnimatePresence } from "framer-motion";
import { useCollection } from "react-firebase-hooks/firestore";
import PoductCard from "components/ProductCard";
import {
  Search as InfoOutlined,
  StarBorder,
  ChevronLeft as ArrowLeft,
  ChevronRight as ArrowRight
} from "@material-ui/icons";

const ProductLog = () => {
  const ref = database.collection("materials");
  const [materials, loading, error] = useCollection(ref);
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={5}
        justify="center"
        alignItems="stretch"
        justifyContent="flex-start"
        style={{ zIndex: 0 }}
        alignContent="stretch"
      >
        {!loading &&
          materials.docs.map((doc, index) => (
            <Grid xs={4} item style={{ zIndex: 0 }}>
              <PoductCard
                key={index}
                index={index}
                id={doc.id}
                {...doc.data()}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ProductLog;
