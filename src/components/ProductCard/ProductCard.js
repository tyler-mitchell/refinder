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
  CardContent,
  Button,
  Divider,
  CardActions,
  CardActionArea,
  makeStyles
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import { database } from "firebase/core";
import { motion, AnimatePresence } from "framer-motion";
import { useCollection } from "react-firebase-hooks/firestore";
import TimeAgo from "timeago-react";

import {
  Search as InfoOutlined,
  StarBorder,
  ChevronLeft as ArrowLeft,
  ChevronRight as ArrowRight
} from "@material-ui/icons";

import { useNavigate } from "react-router";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "5%"
  },
  img: {
    // maxHeight: "5%",
    // objectFit: "cover",
    borderRadius: "10px"

    // paddingTop: "50%"
  }
}));
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

const ProductCard = props => {
  const [hovered, setHovered] = React.useState(false);
  const lightColor = "#ffff";
  const contrastColor = "#FFFF";
  const lightBlurColor = "#FAFAFA";
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <Card
      style={{
        borderRadius: "12px",
        position: "relative",
        overflow: "visible",
        // minWidth: "300px",
        // maxHeight: "300px",
        zIndex: props.index,
        boxShadow:
          "0 6.7px 5.3px  rgba(0, 0, 0, 0.1), 0 22.3px 17.9px  rgba(0, 0, 0, 0.03), 0 100px 80px rgba(0, 0, 0, 0.02)",
        height: "100%"
      }}
      elevation={0}
      // variant="outlined"
    >
      {/* <Box m="5%"> */}
      <CardActionArea>
        <CardMedia
          disableRipple
          style={{
            paddingTop: "60%",
            margin: "5%",
            borderRadius: "8px"
          }}
          // classes={classes}
          // style={{ borderRadius: "7px" }}
          // component="img"
          image={`https://source.unsplash.com/collection/8793876/${props.index})`}
          title="material image"
        />
        {/* </Box> */}
        <motion.div
          style={{ height: "100%" }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          <CardContent
            style={{ height: "100%", position: "relative", padding: 0 }}
          >
            <Grid
              justify="stretch"
              direction="column"
              container
              style={{ height: "100%", display: "relative" }}
            >
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography
                  display="inline"
                  color="textPrimary"
                  component="legend"
                  variant="h5"
                  as="p"
                  style={{
                    lineHeight: "a",
                    // right: -20,
                    // position: "absolute",
                    // top: -10,
                    // color: "white",
                    // padding: "3px",
                    borderRadius: "4px"
                  }}
                >
                  <b> ${((props.index * props.index + 9) % 78) * 5}</b>
                </Typography>
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
                    color="textPrimary"
                  >
                    <b> {props.title}</b>
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    color="textSecondary"
                    display="block"
                    variant="subtitle2"
                  >
                    {props.description}
                  </Typography>
                </Box>
                {/* <Rating name="read-only" value={props.index + (1 % 5)} readOnly /> */}
              </Box>
            </Grid>
          </CardContent>

          <Divider />
        </motion.div>
      </CardActionArea>
      <CardActions>
        <div style={{ flexGrow: 1 }} />
        <Button
          style={{ color: "transparent" }}
          onClick={() => {
            navigate(props.id);
          }}
        >
          View
        </Button>

        {console.log(`⭐: props?.created.toDate()`, props?.created.toDate())}
        <Typography variant="subtitle2" color="textSecondary">
          <TimeAgo datetime={props?.created?.toDate()} />
        </Typography>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
