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
  Avatar,
  CardActions,
  CardActionArea,
  makeStyles,
} from "@material-ui/core";
import PinIcon from "@material-ui/icons/Room";
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
  ChevronRight as ArrowRight,
} from "@material-ui/icons";
import styled from "styled-components";
import { useNavigate, Navigate } from "react-router";
import { useDispatch } from "react-redux";
import { setMapLocation } from "redux/listingsSlice";
const ViewButton = styled(Button)`
  /* border: 1px solid rgba(0, 0, 0, 0.5); */
  /* width: 100%; */

  font-weight: 630;
  color: white;
  background: black;
  font-size: 12px;

  text-transform: none;
  cursor: pointer;
  &:hover {
    color: black;
  }
  /* background: rgba(0, 0, 0, 0.5); */
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03), 0 4px 9px rgba(0, 0, 0, 0.02); */
  transition: all 0.2s;
  margin-bottom: 8px;
  margin-left: 5px;
  margin-right: 5px;
`;
const Thumbnail = styled.div`
  object-fit: cover;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${({ image }) => `url(${image})`};
  height: 100px;
`;
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5%",
  },
  img: {
    // maxHeight: "5%",
    // objectFit: "cover",
    borderRadius: "10px",

    // paddingTop: "50%"
  },
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

        background: "white",
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

const ProductCard = (props) => {
  const dispatch = useDispatch();
  const [hovered, setHovered] = React.useState(false);
  const lightColor = "#ffff";
  const contrastColor = "#FFFF";
  const lightBlurColor = "#FAFAFA";
  const navigate = useNavigate();
  const classes = useStyles();
  function getThumbnail() {
    if (props?.productImages) {
      return props.productImages.find((img) => img.isPrimary === true)
        .downloadUrl;
    }
    return `https://source.unsplash.com/collection/8793876/${props.index})`;
  }
  return (
    <Card
      style={{
        borderRadius: "5px",
        position: "relative",

        // minWidth: "300px",
        // maxHeight: "300px",
        zIndex: props.index,
        boxShadow:
          "0 6.7px 5.3px  rgba(0, 0, 0, 0.05), 0 22.3px 17.9px  rgba(0, 0, 0, 0.003), 0 100px 80px rgba(0, 0, 0, 0.02)",

        // boxShadow:
        //   "-80px 0px 28px 0 rgba(0, 0, 0, 0.005 ), 0 12px 28px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
        // border: "solid 6px #fcfcfd",
        border: "none",
        height: "100%",

        // boxShadow: "0 0px 1px 0 rgba(31,45,61,.5)",
      }}
      elevation={0}
      variant="outlined"
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
                <Typography
                  variant="caption"
                  color="textSecondary"
                  style={{ fontWeight: 600, color: "#09a742", opacity: 0.7 }}
                >
                  {props?.address?.address}
                </Typography>
                // <Typography
                //   variant="caption"
                //   color="textSecondary"
                //   style={{ fontWeight: 600, color: "#09a742", opacity: 0.7 }}
                // >
                //   <span style={{ fontWeight: 600, color: "#09a742" }}>$</span>
                //   {((props.index * props.index + 9) % 78) * 5}
                // </Typography>
              }
              size="small"
              style={{
                borderRadius: "4px",
                background: "#fff",
                position: "absolute",
                // boxShadow:
                //   "0 3px 5px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",

                bottom: 11.5,
                right: 5.5,
              }}
            />
            <CardMedia
              disableRipple
              style={{
                paddingTop: "70%",
                marginBottom: "3%",
                borderRadius: "4px",
              }}
              // classes={classes}
              // style={{ borderRadius: "7px" }}
              // component="img"
              image={getThumbnail()}
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
              overflow: "hidden",
            }}
          >
            <Grid item container justify="space-between" alignItems="center">
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
                  borderRadius: "4px",
                }}
              >
                Wood
              </Typography>
              <Typography
                variant="subtitle2"
                style={{ fontWeight: 600 }}
                color="textSecondary"
              >
                <TimeAgo live={false} datetime={props?.created?.toDate()} />
              </Typography>
            </Grid>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              mb="3px"
            >
              <Chip
                avatar={
                  <Avatar>
                    <PinIcon style={{ fontSize: 12 }} />
                  </Avatar>
                }
                onClick={() => {
                  dispatch(
                    setMapLocation({
                      location: {
                        latitude: props.address.latitude,
                        longitude: props.address.longitude,
                      },
                    })
                  );
                }}
                label={props?.address?.address}
                clickable
                color="secondary"
                size="small"
              />
              <Typography
                display="inline"
                component="legend"
                variant="body1"
                style={{ fontWeight: 310 }}
                color="textPrimary"
              >
                {props.title}
              </Typography>
            </Box>
            <Box>
              <Typography color="textSecondary" display="block" variant="body1">
                {/* <TruncatedText lines={4}>{props.description}</TruncatedText> */}
              </Typography>
            </Box>
            {/* <Rating name="read-only" value={props.index + (1 % 5)} readOnly /> */}
          </Grid>
        </CardContent>

        {/* <Divider /> */}
      </motion.div>

      <CardActions
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
      >
        <div style={{ flexGrow: 1 }} />

        <ViewButton
          color="default"
          variant="outlined"
          onClick={() => {
            navigate(`./materials/${props.id}`, { state: props });
          }}
        >
          View
        </ViewButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
