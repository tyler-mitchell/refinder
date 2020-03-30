import React from "react";

import {
  Card,
  Chip,
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

import TruncatedText from "react-truncate";

import {
  Search as InfoOutlined,
  StarBorder,
  ChevronLeft as ArrowLeft,
  ChevronRight as ArrowRight
} from "@material-ui/icons";
import styled from "styled-components";
import { useNavigate, Navigate } from "react-router";

const Thumbnail = styled.div`
  object-fit: cover;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${({ image }) => `url(${image})`};
  height: 100px;
`;
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
        borderRadius: "6px",
        position: "relative",

        // minWidth: "300px",
        // maxHeight: "300px",
        zIndex: props.index,
        boxShadow:
          "0 6.7px 5.3px  rgba(0, 0, 0, 0.05), 0 22.3px 17.9px  rgba(0, 0, 0, 0.003), 0 100px 80px rgba(0, 0, 0, 0.02)",
        height: "100%"
      }}
      elevation={0}
      // variant="outlined"
    >
      {/* <Box m="5%"> */}

      {/* </Box> */}
      <motion.div
        style={{ height: "100%" }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <CardContent
          component={Grid}
          container
          alignItems="center"
          alignContent="center"
          md={12}
          xs={10}
          style={{ height: "100%", position: "relative", padding: "5%" }}
        >
          <Grid item md={12} xs={3} style={{ position: "relative" }}>
            <Chip
              label={
                <Typography variant="caption" color="textSecondary">
                  ${((props.index * props.index + 9) % 78) * 5}
                </Typography>
              }
              size="small"
              style={{
                borderRadius: "3px 0 0 0",
                background: "white",
                position: "absolute",

                bottom: 2,
                right: 0
              }}
            />
            <CardMedia
              disableRipple
              style={{
                paddingTop: "50%",
                marginBottom: "3%",
                borderRadius: "4px"
              }}
              // classes={classes}
              // style={{ borderRadius: "7px" }}
              // component="img"
              image={`https://source.unsplash.com/collection/8793876/${props.index})`}
              title="material image"
            />
          </Grid>
          <Grid
            xs={9}
            md={12}
            direction="column"
            container
            item
            style={{
              height: "100%",
              display: "relative",
              borderRadius: "4px",
              overflow: "hidden"
            }}
          >
            <CardActionArea>
              <Grid item container justify="space-between">
                <Typography
                  display="inline"
                  align="right"
                  component="legend"
                  variant="caption"
                  style={{
                    opacity: 0.8,

                    // right: -20,
                    // position: "absolute",
                    // top: -10,
                    // color: "white",
                    // padding: "3px",
                    borderRadius: "4px"
                  }}
                >
                  Wood
                </Typography>
              </Grid>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                mb="3px"
              >
                <Typography
                  display="inline"
                  component="legend"
                  variant="body1"
                  color="textPrimary"
                >
                  {props.title}
                </Typography>
              </Box>
              <Box>
                <Typography
                  color="textSecondary"
                  display="block"
                  variant="body1"
                >
                  {/* <TruncatedText lines={4}>{props.description}</TruncatedText> */}
                </Typography>
              </Box>
              {/* <Rating name="read-only" value={props.index + (1 % 5)} readOnly /> */}
            </CardActionArea>
          </Grid>
        </CardContent>

        <Divider />
      </motion.div>
      <Button
        onClick={() => {
          navigate(props.id, { state: props });
        }}
      >
        View
      </Button>
      {/* <CardActions>
        <div style={{ flexGrow: 1 }} />

        {console.log(`⭐: props?.created.toDate()`, props?.created.toDate())}
        <Typography variant="subtitle2" color="textSecondary">
          <TimeAgo datetime={props?.created?.toDate()} />
        </Typography>
      </CardActions> */}
    </Card>
  );
};

export default ProductCard;
