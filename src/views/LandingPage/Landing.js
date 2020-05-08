import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  Header as AppHeader,
  CollapseBtn,
  CollapseIcon,
  Content,
  contentBasedLayoutPreset,
  cozyLayoutPreset,
  Footer,
  Root,
  Sidebar,
  SidebarTrigger,
  SidebarTriggerIcon,
} from "@mui-treasury/layout";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  animated,
  Parallax,
  ParallaxLayer,
  useSpring,
} from "react-spring/renderprops-addons";
import styled from "styled-components";

import header_image from "assets/header_image.svg";

const StyledContent = styled(Content)`
  scroll-snap-type: y mandatory;
  &.proximity {
    scroll-snap-type: y proximity;
  }
`;

const Header = () => {
  let navigate = useNavigate();
  return (
    <Grid item container direction="column">
      <Grid item>
        <Typography variant="h2" style={{ marginBottom: "0.5vh" }}>
          {/* Buy and sell building materials */}A marketplace for <br />{" "}
          builders and materials
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography
          variant="h5"
          gutterBottom
          style={{ marginBottom: "1.5vh", color: "rgba(0,0,0,0.7)" }}
        >
          Rediscover value in building materials
        </Typography>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          disableElevation
          style={{ borderRadius: "25px", textTransform: "none" }}
          color="primary"
          size="large"
          onClick={() => {
            navigate("/marketplace");
          }}
        >
          Go to Marketplace
        </Button>
      </Grid>
      <div style={{ marginTop: "8vh" }} />
    </Grid>
  );
};

const Features = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Typography variant="h4" style={{ fontWeight: 600 }}>
          Find Nearby Materials
        </Typography>
        <Typography variant="subtitle1">
          An interactive map that shows nearby materials
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h4" style={{ fontWeight: 600 }}>
          Built-in Chat
        </Typography>
        <Typography variant="subtitle1">
          {" "}
          Communicate with buyers and sellers in-app
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h4" style={{ fontWeight: 600 }}>
          Recovered value
        </Typography>
        <Typography variant="subtitle1">
          Buy or sell surplus building materials
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h4" style={{ fontWeight: 600 }}>
          Match-making
        </Typography>
        <Typography variant="subtitle1">
          Get connected with suppliers
        </Typography>
      </Grid>
    </Grid>
  );
};
const WhySection = () => {
  return (
    <Grid
      item
      container
      direction="column"
      xs={8}
      style={{ position: "relative", zIndex: 1, color: "white" }}
    >
      <Grid item>
        <Typography variant="h3" color="inherit">
          Why we exist
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" color="inherit" gutterBottom={true}>
          to accelerate the adoption of circular economies
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          disableElevation
          style={{ borderRadius: "25px", textTransform: "none" }}
          color="primary"
          size="large"
        >
          Learn More
        </Button>
      </Grid>
    </Grid>
  );
};

const KnowledgeSection = () => {
  return (
    <Grid
      item
      container
      direction="column"
      xs={8}
      style={{ position: "relative", zIndex: 1 }}
    >
      <Grid item>
        <Typography variant="h4">Build your knowledge</Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Whether you're a</Typography>
      </Grid>
    </Grid>
  );
};

const NavigationBar = () => {
  let navigate = useNavigate();
  return (
    <AppBar elevation={0} style={{ background: "rgba(255,255,255,0.2)" }}>
      <Toolbar style={{ background: "transparent" }}>
        {/* <SidebarTrigger>
          <SidebarTriggerIcon />
        </SidebarTrigger> */}
        <Typography variant="h6">Refinder</Typography>
        <div style={{ flexGrow: 1 }} />
        <Button
          variant="text"
          style={{ borderRadius: "25px", textTransform: "none" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          Log In
        </Button>
        {/* <div style={{ width: "1%" }} /> */}
        <Button
          variant="contained"
          color="primary"
          disableElevation
          style={{ borderRadius: "25px", textTransform: "none" }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Get Started
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const LandingContainer = ({ children }) => {
  return (
    <>
      <Content style={{ background: "white" }}>{children}</Content>
    </>
  );
};
const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};
const Landing = () => {
  let parallax = React.useRef();
  const url = (name, wrap = false) =>
    `${
      wrap ? "url(" : ""
    }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
      wrap ? ")" : ""
    }`;

  const loadingContainer = {
    width: "10%",
    height: "25%",
    display: "flex",
    justifyContent: "space-around",
  };

  const loadingCircle = {
    display: "block",
    width: "2vh",
    height: "2vh",
    backgroundColor: "black",
    borderRadius: "1.5vh",
  };

  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.5,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const loadingCircleVariants = {
    start: {
      y: "50%",
    },
    end: {
      y: "150%",
    },
  };

  const loadingCircleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  function ThreeDotsWave() {
    return (
      <motion.div
        style={loadingContainer}
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
      </motion.div>
    );
  }

  let navigate = useNavigate();
  const { loggedIn } = useSelector((s) => s.auth);

  const [loading, setLoading] = React.useState(true);
  React.useLayoutEffect(() => {
    if (loggedIn !== null) {
      if (loggedIn) {
        setTimeout(() => {
          setLoading(false);
          navigate("/marketplace");
        }, 1000);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
  }, [loggedIn]);

  return (
    <Root omitThemeProvider style={{ background: "white" }}>
      <NavigationBar />
      <AnimatePresence>
        {loading ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThreeDotsWave />
            {/* <motion.img
              src={require("assets/refinder-logo.svg")}
              animate={{ y: [10, 20, 100, 10] }}
              exit={{ y: [-10, -20, -30, -10] }}
              initial={{ y: -100 }}
              style={{
                height: "300px",
                position: "relative",
              }}
              alt=""
              transition={{
                flip: Infinity,
                ease: "easeInOut",
                // from: { y: 10 },
                // to: { y: -10 },
                duration: 1,
              }}
            /> */}
          </div>
        ) : (
          <Content style={{ overflow: "hidden" }}>
            <Parallax ref={parallax} pages={1.2}>
              <ParallaxLayer
                offset={0}
                speed={0.1}
                factor={1}
                style={{ background: "white" }}
              />
              <ParallaxLayer
                offset={0.5}
                speed={-0.5}
                factor={1}
                style={{ backgroundColor: "#0055ea" }}
              />

              <Container
                maxWidth="md"
                style={{
                  position: "relative",
                  height: "100%",
                  marginTop: "70px",
                }}
              >
                <ParallaxLayer>
                  <ParallaxLayer
                    offset={0.05}
                    speed={0.1}
                    factor={0.8}
                    // onClick={() => parallax.current.scrollTo(1)}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      scrollSnapAlign: "center",
                      position: "absolute",

                      backgroundColor: "white",
                      padding: "30px",
                      boxShadow: "rgba(0, 0, 0, 0.12) 0px -3px 16px -3px",
                      borderRadius: "20px",
                    }}
                  >
                    <Header />

                    <div
                      style={{
                        position: "relative",
                        width: "50%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ParallaxLayer
                        offset={0}
                        speed={0.2}
                        factor={0.9}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <img
                          src={require("assets/refinder-logo.svg")}
                          style={{
                            height: "30%",

                            position: "relative",
                            top: 0,
                            // top: "-23%",
                          }}
                          alt=""
                        />
                      </ParallaxLayer>
                    </div>
                  </ParallaxLayer>
                  <ParallaxLayer
                    offset={0.5}
                    factor={0.2}
                    speed={0.1}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      padding: "30px",
                      pointerEvents: "none",
                      width: "100%",
                    }}
                  >
                    {" "}
                    <Features />
                  </ParallaxLayer>
                </ParallaxLayer>
              </Container>
            </Parallax>
          </Content>
        )}
      </AnimatePresence>
    </Root>
  );
};

export default Landing;
