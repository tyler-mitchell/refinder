import React from "react";
import {
  Typography,
  Container,
  Link,
  Grid,
  Paper,
  InputBase,
  InputAdornment,
  makeStyles,
  Divider,
  ListItemIcon,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListSubheader,
  ListItemText,
  Avatar,
  List,
  ListItem,
} from "@material-ui/core";
import Map from "components/Map/MapBoxWrap";
import ProductList from "components/ProductsList";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import SearchIcon from "@material-ui/icons/Search";
import WoodIcon from "@material-ui/icons/FilterHdr";
import ChevronRightIcon from "@material-ui/icons/ChevronRightRounded";
import useDimensions from "hooks/useDimensions";

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
  background: rgba(255, 255, 255, 0.3);
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
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
const ExplorerWrapper = styled(Paper)`
  border-radius: 15px 15px 15px 15px;
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.06), 0 2px 4px 0 rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  height: 700px;
  width: 860px;
  position: relative;
  background: rgba(0, 0, 0, 0);
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
        />
        <ChevronRightIcon style={{ color: "rgba(0,0,0,0.2)" }} />
      </ListItem>
    </>
  );
};

const DashboardView = () => {
  const { reference, handleSubmit, reset, control } = useForm();

  const styles = useStyles();

  const [ref, { x, y, width }] = useDimensions();
  return (
    <Container
      maxWidth="xl"
      style={{ paddingTop: "1%", paddingBottom: "28px" }}
    >
      <Grid
        container
        justify="stretch"
        wrap="nowrap"
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <Grid item>
          <ExplorerWrapper>
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
                  subtitle="Find wood near you"
                  icon={WoodIcon}
                />
                <CategoryListItem
                  type="metal"
                  title="Metal"
                  subtitle="Find wood near you"
                  icon={WoodIcon}
                />
                <CategoryListItem
                  type="concrete"
                  title="Concrete"
                  subtitle="Find wood near you"
                  icon={WoodIcon}
                />
                <CategoryListItem
                  type="tile"
                  title="Tile"
                  subtitle="Find wood near you"
                  icon={WoodIcon}
                />
                <CategoryListItem
                  type="glass"
                  title="Glass"
                  subtitle="Find wood near you"
                  icon={WoodIcon}
                />
                <CategoryListItem
                  type="glass"
                  title="Antique"
                  subtitle="Find wood near you"
                  icon={WoodIcon}
                />
              </List>
              <Divider orientation="vertical" flexItem />
              <ProductViewContainer>
                <ProductList />
              </ProductViewContainer>
            </div>
          </ExplorerWrapper>
        </Grid>
        <Grid
          xs={5}
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
          {" "}
          <div
            style={{
              width: "100%",
              userSelect: "none",
              height: "100%",
              background: "blue",
            }}
            ref={ref}
          >
            Hello
          </div>
        </Grid>
      </Grid>

      <div
        style={{
          position: "absolute",
          zIndex: 0,
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Map x={x} y={y} height="100%" />
      </div>
    </Container>
  );
};

export default DashboardView;
