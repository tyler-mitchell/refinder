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
  Link as MuiLink,
  makeStyles,
} from "@material-ui/core";
import LocationIcon from "@material-ui/icons/GpsFixedRounded";
import PinIcon from "@material-ui/icons/LocationOn";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import { database } from "firebase/core";
import { motion, AnimatePresence } from "framer-motion";
import { useCollection } from "react-firebase-hooks/firestore";
import TimeAgo from "timeago-react";
import LikedIcon from "@material-ui/icons/FavoriteRounded";
import LikeIcon from "@material-ui/icons/FavoriteBorderRounded";

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

function isNewPost(date) {
  const DAY = 1000 * 60 * 60 * 24;
  const DAYS = DAY * 4;
  const aDayAgo = Date.now() - DAYS;
  return date > aDayAgo;
}

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
  cardRoot: {
    flexGrow: 1,
    flexWrap: "wrap",
  },
  media: {
    width: "100%",
    height: "auto",
    minWidth: 220,
    minHeight: 170,
  },
  mediaItem: {
    flex: 1,
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    minWidth: 220,
    minHeight: 170,
  },
  contentItem: {
    // flex: 2,
    minWidth: 150,
  },
}));

const StyledCardMedia = styled(CardActionArea)`
  position: relative;
  padding: 3%;
`;

const StyledLikeAction = styled.div`
  opacity: ${({ liked }) => (liked ? 1 : 0)};
  display: flex;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  position: absolute;
  top: 7px;
  right: 7px;
  ${StyledCardMedia}:hover & {
    opacity: 1;
  }

  transition: opacity 0.2s;
`;

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
  const [liked, setLiked] = React.useState(false);
  return (
    <Card
      style={{
        borderRadius: "5px",
        position: "relative",

        zIndex: props.index,
        boxShadow:
          "0 6.7px 5.3px  rgba(0, 0, 0, 0.05), 0 22.3px 17.9px  rgba(0, 0, 0, 0.003), 0 100px 80px rgba(0, 0, 0, 0.02)",
        border: "none",
        // height: "100%",
      }}
      elevation={0}
      variant="outlined"
    >
      <Grid container className={classes.cardRoot}>
        <Grid
          item
          xs={12}
          sm
          className={classes.mediaItem}
          style={{ position: "relative" }}
        >
          {isNewPost(props?.created?.toDate()) && (
            <Chip
              color="primary"
              label="NEW"
              size="small"
              style={{
                position: "absolute",
                letterSpacing: "0.4px",
                borderRadius: "5px",
                left: 10,
                boxShadow: "0 0 3px 4px rgba(50,66,81,.1)",
                top: 10,
                zIndex: 2,
                fontSize: 12,
                fontWeight: 600,
              }}
            />
          )}
          <StyledCardMedia
            disableRipple
            style={{ zIndex: 1 }}
            onClick={() => {
              dispatch(
                setMapLocation({
                  location: {
                    latitude: props.address.latitude,
                    longitude: props.address.longitude,
                  },
                  productId: props.id,
                })
              );
            }}
          >
            <CardMedia
              disableRipple
              style={{
                // paddingTop: "70%",

                borderRadius: "4px",
              }}
              // classes={classes}
              // style={{ borderRadius: "7px" }}
              // component="img"
              className={classes.media}
              image={getThumbnail()}
            />
            <StyledLikeAction liked={liked}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked(!liked);
                }}
                style={{ borderRadius: "6px", padding: "7.5px" }}
              >
                {liked ? (
                  <LikedIcon
                    fontSize="small"
                    style={{
                      color: liked ? "#ff5766" : "#b5bac1",
                      fontSize: 14,
                    }}
                  />
                ) : (
                  <LikedIcon
                    fontSize="small"
                    style={{
                      fontSize: 14,
                      color: liked ? "#ff5766" : "#b5bac1",
                    }}
                  />
                )}
              </IconButton>

              {/* <IconButton
                  size="small"
                  onClick={() => {
                    dispatch(
                      setMapLocation({
                        location: {
                          latitude: props.address.latitude,
                          longitude: props.address.longitude,
                        },
                        productId: props.id,
                      })
                    );
                  }}
                  style={{ borderRadius: "6px", padding: "7.5px" }}
                >
                  <PinIcon style={{ fontSize: 18, color: "black" }} />
                </IconButton> */}
            </StyledLikeAction>
          </StyledCardMedia>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs direction="column" className={classes.contentItem}>
            <CardContent
              // component={Grid}
              // container
              // alignItems="center"
              // alignContent="center"
              // md={12}
              // xs={10}
              style={{ height: "100%", position: "relative", padding: "5%" }}
            >
              <Grid
                direction="column"
                container
                item
                style={{
                  height: "100%",
                  display: "relative",
                  borderRadius: "4px",
                  // overflow: "hidden",
                }}
              >
                <section
                  style={{ verticalAlign: "bottom", position: "relative" }}
                >
                  <Typography
                    variant="subtitle2"
                    display="inline"
                    style={{
                      fontWeight: 600,
                      float: "right",
                      // width: "100px",
                      lineHeight: "22px",
                      height: "10px",
                      verticalAlign: "bottom",
                      color: "rgba(0,0,0,0.3)",
                      marginLeft: "5px",
                    }}
                    color="textSecondary"
                  >
                    <TimeAgo live={false} datetime={props?.created?.toDate()} />
                  </Typography>
                  <MuiLink
                    // component="button"
                    // component="p"
                    color="inherit"
                    align="left"
                    variant="body1"
                    style={{
                      fontWeight: 650,
                      verticalAlign: "top",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(`./materials/${props.id}`, { state: props });
                    }}
                  >
                    {props.title}
                  </MuiLink>
                </section>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mb="3px"
                >
                  <Typography
                    align="left"
                    style={{
                      opacity: 0.8,
                      fontWeight: 600,
                      fontSize: 12,
                      // right: -20,
                      // position: "absolute",
                      // top: -10,
                      // color: "white",
                      // padding: "3px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PinIcon
                      style={{ fontSize: 12, verticalAlign: "middle" }}
                    />
                    <p> {props?.address?.complete.split(",")[0]}</p>
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
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Grid>
      <CardActions>
        <div style={{ flexGrow: 1 }} />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
