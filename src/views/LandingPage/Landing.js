import React from "react";
import {
  Grid,
  Typography,
  Toolbar,
  Button,
  Container,
  Box,
  Paper,
  CssBaseline
} from "@material-ui/core";
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

import {
  Root,
  Header as AppHeader,
  Sidebar,
  Content,
  Footer,
  CollapseBtn,
  CollapseIcon,
  SidebarTrigger,
  cozyLayoutPreset,
  contentBasedLayoutPreset,
  SidebarTriggerIcon
} from "@mui-treasury/layout";

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
          Buy and sell building materials
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography
          variant="subtitle1"
          gutterBottom
          style={{ marginBottom: "1.5vh" }}
        >
          {/* A community-driven marketplace for finding nearby building materials */}
          with construction companies, local businesses, craftsmen,
          home-improvers, etc.
        </Typography>
      </Grid>
      <Grid item xs={3}>
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
      style={{ position: "relative", zIndex: 1 }}
    >
      <Grid item>
        <Typography variant="h3">Why we exist</Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" gutterBottom={true}>
          Empower users to make sustainable purchasing
        </Typography>
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
    <AppHeader>
      <Toolbar>
        {/* <SidebarTrigger>
          <SidebarTriggerIcon />
        </SidebarTrigger> */}
        <Typography variant="h6">Refinder</Typography>
        <div style={{ flexGrow: 1 }} />
        <Button
          variant="text"
          style={{ borderRadius: "25px", textTransform: "none" }}
          onClick={() => {
            navigate("/onboard");
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
            navigate("/onboard");
          }}
        >
          Get Started
        </Button>
      </Toolbar>
    </AppHeader>
  );
};

//---

const LandingContainer = ({ children }) => {
  return (
    <>
      <Content style={{ background: "white" }}>{children}</Content>
    </>
  );
};

const Landing = () => {
  let parallax = React.useRef();
  const url = (name, wrap = false) =>
    `${
      wrap ? "url(" : ""
    }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
      wrap ? ")" : ""
    }`;

  return (
    <Root omitThemeProvider>
      <NavigationBar />

      <Content>
        <Parallax
          ref={parallax}
          pages={3}
          style={{ scrollSnapType: "y mandatory", overflow: "hidden" }}
        >
          <ParallaxLayer
            offset={0.5}
            speed={0.2}
            style={{ backgroundColor: "#805E73" }}
          />
          <ParallaxLayer
            offset={1}
            speed={1}
            style={{ backgroundColor: "#87BCDE" }}
          />

          <ParallaxLayer
            offset={0}
            speed={0}
            style={{
              backgroundImage: url("stars", true),
              backgroundSize: "cover"
            }}
          />

          <ParallaxLayer
            offset={1.3}
            speed={-0.3}
            style={{ pointerEvents: "none" }}
          >
            <img
              src={url("satellite4")}
              style={{ width: "15%", marginLeft: "70%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
            <img
              src={url("cloud")}
              style={{ display: "block", width: "20%", marginLeft: "55%" }}
            />
            <img
              src={url("cloud")}
              style={{ display: "block", width: "10%", marginLeft: "15%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
            <img
              src={url("cloud")}
              style={{ display: "block", width: "20%", marginLeft: "70%" }}
            />
            <img
              src={url("cloud")}
              style={{ display: "block", width: "20%", marginLeft: "40%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
            <img
              src={url("cloud")}
              style={{ display: "block", width: "10%", marginLeft: "10%" }}
            />
            <img
              src={url("cloud")}
              style={{ display: "block", width: "20%", marginLeft: "75%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
            <img
              src={url("cloud")}
              style={{ display: "block", width: "20%", marginLeft: "60%" }}
            />
            <img
              src={url("cloud")}
              style={{ display: "block", width: "25%", marginLeft: "30%" }}
            />
            <img
              src={url("cloud")}
              style={{ display: "block", width: "10%", marginLeft: "80%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
            <img
              src={url("cloud")}
              style={{ display: "block", width: "20%", marginLeft: "5%" }}
            />
            <img
              src={url("cloud")}
              style={{ display: "block", width: "15%", marginLeft: "75%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2.5}
            speed={-0.4}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none"
            }}
          >
            <img src={url("earth")} style={{ width: "60%" }} />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0.3}
            style={{
              backgroundSize: "80%",
              backgroundPosition: "center",
              backgroundImage: url("clients", true)
            }}
          />
          <Container
            maxWidth="md"
            style={{ position: "relative", height: "100%" }}
          >
            <ParallaxLayer
              offset={0}
              speed={0.1}
              factor={0.5}
              // onClick={() => parallax.current.scrollTo(1)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                scrollSnapAlign: "center"
              }}
            >
              <Header />
              <img src={url("server")} style={{ width: "20%" }} />
            </ParallaxLayer>
            <ParallaxLayer
              offset={0.5}
              factor={0.5}
              speed={0.1}
              // onClick={() => parallax.current.scrollTo(2)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvent: "none",
                scrollSnapAlign: "center"
              }}
            >
              <WhySection />
              <img src={url("bash")} style={{ width: "40%" }} />
            </ParallaxLayer>
            <ParallaxLayer
              offset={1}
              speed={-0}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              // onClick={() => parallax.current.scrollTo(0)}
            >
              <KnowledgeSection />
              <img src={url("clients-main")} style={{ width: "40%" }} />
            </ParallaxLayer>
          </Container>
        </Parallax>
      </Content>
    </Root>
  );
};

export default Landing;
