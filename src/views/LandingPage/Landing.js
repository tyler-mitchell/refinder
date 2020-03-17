import React from "react"
import { Grid, Typography, Toolbar, Button, Container, Box, Paper, CssBaseline } from '@material-ui/core'
import styled from 'styled-components'
import { Navigate, useNavigate } from 'react-router-dom';

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



const Backdrop = styled.div`

  
  

`

const Header = () => {
    let navigate = useNavigate();
    return (
        <Grid item container direction="column" >

            <Grid item>
                <Typography variant="h2" >
                    Refinder
                    </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1">
                    A community-driven marketplace for finding nearby building materials
                    </Typography>
            </Grid>
            <Grid item> <Button variant="outlined" onClick={() => { navigate('/marketplace') }}>Go to Marketplace</Button></Grid>
        </Grid>
    )
}

const WhySection = () => {
    return (
        <Grid item container direction="column" xs={8} style={{ position: 'relative', zIndex: 1 }}>
            <Grid item>
                <Typography variant="h3" >
                    Why we exist
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" gutterBottom={true}>
                    Empower users to make sustainable purchasing
                </Typography>
            </Grid>
        </Grid>

    )
}

const KnowledgeSection = () => {
    return (
        <Grid item container direction="column" xs={8} style={{ position: 'relative', zIndex: 1 }}>
            <Grid item>
                <Typography variant="h4" >
                    Build your knowledge
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" >
                    Whether you're a
                </Typography>
            </Grid>
        </Grid>

    )
}

const NavigationBar = () => {
    return (
        <AppHeader>
            <Toolbar>
                <SidebarTrigger>
                    <SidebarTriggerIcon />
                </SidebarTrigger>
                <Button variant="text">Log In</Button>
                <Button variant="outlined">Get Started</Button>
            </Toolbar>
        </AppHeader>
    )
}

//--- 

const LandingContainer = ({ children }) => {
    return (
        <>
            <NavigationBar />
            <Content >

                <Container maxWidth='md' style={{ height: '100%' }}>
                    {children}
                </Container>

            </Content>
        </>
    )
}
const Landing = () => {
    return (
        <Root omitThemeProvider >

            <LandingContainer >
                <Grid container direction="column" spacing={3} justify="space-around">
                    <Button variant="contained" color="primary">Hello theme</Button>
                    <Header />
                    <WhySection />
                    <KnowledgeSection />
                </Grid>
            </LandingContainer>
        </Root>
    )
}

export default Landing;