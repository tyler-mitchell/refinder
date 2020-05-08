import {
  Avatar,
  Container,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRightRounded";
import CloseIcon from "@material-ui/icons/Close";
import WoodIcon from "@material-ui/icons/FilterHdr";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Map from "components/Map/MapBoxWrap";
import ProductList from "components/ProductsList";
import useDimensions from "hooks/useDimensions";
import ProductView from "views/ProductView";

function getMaterialColor(material) {
  switch (material) {
    case "wood":
      return "#cf8464";
    // case "wood":
    //   return "#ffc400";

    case "metal":
      return "#3b475b";

    case "glass":
      return "#51a2ff";

    case "tile":
      return "#ff5154";

    case "concrete":
      return "#9CADAF";

    default:
      break;
  }
}
const useStyles = makeStyles(() => ({
  icon: {
    color: "rgb(0, 153, 255)",
    width: 34,
    height: 34,
    padding: 6,
    "&:not(:first-child)": {
      marginLeft: 4,
    },
  },
  input: {
    flex: "auto",
    borderRadius: "15px 15px 0 0",

    // backgroundColor: "rgba(0,0,0,0.04)",
    background: "white",
    height: 36,
    fontSize: 18,
    fontWeight: 420,
    marginTop: 5,
  },
}));

const ProductViewContainer = styled(Container)`
  /* background: rgba(0, 0, 0, 0.2); */
  background: rgb(226, 232, 238);
  /* background-image: radial-gradient(
    circle farthest-corner at 0% 0.5%,
    rgba(241, 241, 242, 1) 0.1%,
    rgba(224, 226, 228, 1) 100.2%
  ); */

  /* background-image: radial-gradient(73% 147%, #eadfdf 59%, #ece2df 100%),
    radial-gradient(
      91% 146%,
      rgba(255, 255, 255, 0.5) 47%,
      rgba(0, 0, 0, 0.5) 100%
    ); */
  background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
  background-blend-mode: screen;
  background-image: linear-gradient(-225deg, #fffeff 0%, #d7fffe 100%);
  overflow-y: scroll;
  backdrop-filter: blur(2px);

  border-radius: 0 0 15px 0;
  padding-top: 20px;
  padding-bottom: 20px;
  scroll-behavior: smooth;
  &::-webkit-scrollbar-track {
    /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
    /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;

    border-radius: 0 0 15px 0;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
const ExplorerWrapper = styled(Grid)`
  border-radius: 0px 15px 15px 15px;
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.06), 0 2px 4px 0 rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  height: calc(100vh - 65px);
  /* width: 860px; */
  position: relative;
  background: rgba(255, 255, 255, 1);
  z-index: 300;
`;

const CategoryListItem = ({ title, subtitle, icon: Icon, type }) => {
  return (
    <>
      <ListItem button>
        <ListItemAvatar>
          <Avatar
            style={{ borderRadius: "9px", background: getMaterialColor(type) }}
          >
            <Icon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primaryTypographyProps={{ style: { fontWeight: 650 } }}
          primary={title}
          secondary={subtitle}
          secondaryTypographyProps={{ noWrap: true }}
        />
        <ChevronRightIcon style={{ color: "rgba(0,0,0,0.2)" }} />
      </ListItem>
    </>
  );
};

export const ProductModalView = ({ children, from }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(true);
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={modalOpen}
      // open={true}
      closeAfterTransition
      // transitionDuration={{ appear: 3000, exit: 3000, enter: 3000 }}
      onExited={() => {
        navigate(-1);
      }}
      style={{ overflow: "visible" }}
      PaperProps={{ style: { overflow: "visible" } }}
      scroll="body"
      // ref={containerRef}
    >
      <IconButton
        style={{ position: "absolute", top: 2, right: 2 }}
        size="small"
        onClick={() => {
          // navigate("../");
          setModalOpen(false);
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent style={{ minHeight: "90vh" }}>
        <ProductView />
      </DialogContent>
    </Dialog>
  );
};

const DashboardView = () => {
  const { reference, handleSubmit, reset, control } = useForm();

  const styles = useStyles();
  const [modalOpen, setModalOpen] = React.useState(true);
  const [ref, { x, y, width }] = useDimensions();
  return (
    <div
      maxWidth="xl"
      style={{
        // paddingTop: "1%",
        // paddingBottom: "28px",
        // maxHeight: "90vh",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        justify="stretch"
        wrap="nowrap"
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <ExplorerWrapper component={Paper} xs={8}>
          <div style={{ background: "white", borderRadius: "15px 15px 0 0" }}>
            <Controller
              as={InputBase}
              className={styles.input}
              defaultValue=""
              control={control}
              placeholder={"Find materials near you..."}
              fullWidth
              autoComplete="off"
              name="message"
              startAdornment={
                <InputAdornment position={"end"}>
                  <SearchIcon fontSize="small" className={styles.icon} />
                </InputAdornment>
              }
            />
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              height: "calc(100% - 45px)",
              overflow: "hidden",
            }}
          >
            <List
              style={{
                maxWidth: "300px",
                borderRadius: "0 0 2px 15px",
                width: "100%",
                background: "white",
                padding: 0,
                margin: 0,
              }}
              subheader={
                <ListSubheader component="div" id="explore-list-subheader">
                  Explore
                </ListSubheader>
              }
            >
              <CategoryListItem
                type="wood"
                title="Wood"
                subtitle="Find pallets, planks, fences, and more"
                icon={WoodIcon}
              />

              <CategoryListItem
                type="concrete"
                title="Bricks & Concrete"
                subtitle="Find bricks and concrete"
                icon={WoodIcon}
              />
              <CategoryListItem
                type="tile"
                title="Slates & Tiles"
                subtitle="Find slates, tiles, mason"
                icon={WoodIcon}
              />
              <CategoryListItem
                type="glass"
                title="Glass"
                subtitle="Find mirrors, structural glasses, ... "
                icon={WoodIcon}
              />
              <CategoryListItem
                type="fixture"
                title="Fixtures"
                subtitle="Find doors, windows, cabinets, ..."
                icon={WoodIcon}
              />
              <CategoryListItem
                type="metal"
                title="Flooring"
                subtitle="Find wood floors, natural stones, carpet... "
                icon={WoodIcon}
              />
              <CategoryListItem
                type="glass"
                title="Antique"
                subtitle="Find historic items"
                icon={WoodIcon}
              />
            </List>
            <Divider orientation="vertical" flexItem />
            <ProductViewContainer>
              <ProductList modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </ProductViewContainer>
          </div>
        </ExplorerWrapper>

        <Grid
          zeroMinWidth
          xs={4}
          item
          style={{
            background: "red",
            // width: "100%",
            // height: "100%",
            // position: "relative",
            userSelect: "none",
            // zIndex: 100,
            opacity: 0,
          }}
        >
          <div
            style={{
              width: "100%",
              userSelect: "none",
              height: "100%",
              background: "blue",
            }}
            ref={ref}
          ></div>
        </Grid>
      </Grid>

      <div
        style={{
          position: "absolute",
          zIndex: 0,
          right: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Map x={x} y={y} height="100%" />
      </div>

      <Outlet />
    </div>
  );
};

export default DashboardView;
