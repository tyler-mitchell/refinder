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

import firebase from "firebase";
import { motion, AnimatePresence } from "framer-motion";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  Search as InfoOutlined,
  StarBorder,
  ChevronLeft as ArrowLeft,
  ChevronRight as ArrowRight
} from "@material-ui/icons";

const CarouselArrow = ({ icon: Icon, direction, hovered }) => {
  const { left, right } =
    direction === "left"
      ? { left: -10, right: "initial" }
      : { right: -10, left: "initial" };
  return (
    <Fab
      // variant="extended"
      style={{
        position: "relative",
        left,
        right,

        background: "white"
        // paddingLeft: left,
        // height: "25px",
        // width: "25px"
        // paddingRight: right
      }}
      size="small"
    >
      {/* {direction === "right" && <span>&nbsp;&nbsp;</span>} */}

      {Icon}
      {/* {direction === "left" && <span>&nbsp;&nbsp;</span>} */}
    </Fab>
  );
};

const Product = props => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Card
        style={{
          borderRadius: "12px",
          position: "relative",
          overflow: "visible",
          minWidth: "300px",
          minHeight: "300px"
        }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                type: "spring",
                duration: 0.01,
                stiffness: 50,
                restSpeed: 1
              }}
              style={{
                position: "absolute",
                top: "25%",
                display: "flex",
                justifyContent: "space-between",
                width: "100%"
              }}
            >
              <CarouselArrow
                hovered={hovered}
                direction="left"
                icon={<ArrowLeft />}
              />

              <CarouselArrow
                hovered={hovered}
                direction="right"
                icon={<ArrowRight />}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <CardMedia
          style={{ height: 200, borderRadius: "12px 12px 0 0" }}
          image={`https://source.unsplash.com/collection/8793876/${props.index}`}
          title="Paella dish"
        />
        <CardContent>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              mb="3px"
            >
              <Typography
                display="inline"
                component="legend"
                variant="subtitle2"
              >
                {props.type}
              </Typography>
              <Typography
                display="inline"
                color="textSecondary"
                component="legend"
                variant="subtitle2"
                style={{
                  background: "#06caaf",
                  position: "relative",
                  right: -20,
                  color: "white",
                  padding: "3px",
                  borderRadius: "4px"
                }}
              >
                ${((props.index * props.index + 9) % 78) * 5}
              </Typography>
            </Box>
            <Box mb="10px">
              <Typography
                color="textSecondary"
                display="block"
                variant="subtitle2"
              >
                {props.name}
              </Typography>
            </Box>
            <Rating name="read-only" value={props.index % 5} readOnly />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
const useChromeInputStyles = () => {
  const space = "200px"; // default = 8;
  const backgroundColor = "#F1F3F4";
  const borderRadius = 100; // rounded
  const inputPadding = space / 4;
  return {
    root: {
      backgroundColor,
      borderRadius,
      padding: inputPadding
    },
    icon: {
      padding: `${space / 2}px ${space}px`,
      borderRadius
    }
  };
};

const Search = () => {
  const styles = useChromeInputStyles();
  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      mt="30px"
      mb="30px"
    >
      <Box bgcolor="#F1F3F4" width="600px" borderRadius="10px" textAlign="left">
        <InputBase
          classes={styles}
          placeholder={"Search for materials..."}
          startAdornment={
            <IconButton className={styles.icon}>
              <InfoOutlined />
            </IconButton>
          }
          // endAdornment={
          //   <IconButton className={styles.icon}>
          //     <StarBorder />
          //   </IconButton>
          // }
        />
      </Box>
    </Box>
  );
};
const ProductLog = () => {
  const ref = firebase.firestore().collection("materials");
  const [materials, loading, error] = useCollection(ref);
  return (
    <Container maxWidth="xl">
      <Search />
      <Grid
        container
        spacing={5}
        justify="center"
        justifyContent="flex-start"
        style={{ zIndex: 0 }}
        alignContent="stretch"
      >
        {!loading &&
          materials.docs.map((doc, index) => (
            <Grid item style={{ zIndex: 0 }}>
              <Product key={index} index={index} {...doc.data()} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ProductLog;
