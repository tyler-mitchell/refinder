import React from "react"
import { Grid, Typography, Toolbar, Button, Container, Box, Paper } from '@material-ui/core'
import styled from 'styled-components'

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
    return (
        <Grid item container direction="column" xs={8} style={{ position: 'relative', zIndex: 1 }}>

            <Grid item>
                <Typography variant="h4" >
                    Refinder
                    </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1">
                    A community-driven marketplace for finding nearby building materials
                    </Typography>
            </Grid>
            <Grid item> <Button variant="outlined">Get Started</Button></Grid>
        </Grid>
    )
}

const Summary = () => {
    return (
        <Grid item container direction="column" xs={8} style={{ position: 'relative', zIndex: 1 }}>
            <Grid item>
                <Typography variant="h4" >
                    Your guide to finding what you need to build what you want
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1">
                    Connect with others who want to buy and sell your building materials.
                </Typography>
            </Grid>
            <Grid item> <Button variant="outlined">Get Started</Button></Grid>
        </Grid>

    )
}

const WhySection = () => {
    return (
        <Grid item container direction="column" xs={8} style={{ position: 'relative', zIndex: 1 }}>
            <Grid item>
                <Typography variant="h4" >
                    Why we exist
                </Typography>
            </Grid>

            <Grid item>
                <Slides />
            </Grid>
        </Grid>

    )
}

const Slides = () => {
    return (
        <Paper variant='elevation' elevation={2} >
            <Box width='120px' height='120px' />
        </Paper >
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

const LandingContainer = ({ children }) => {
    return (
        <>
            <NavigationBar />
            <Content >
                <Box width="100%" px="30px" display="flex" flexDirection="column" justifyContent="center" justifyItems="center" >
                    <Grid container spacing={3} style={{ width: '100%' }}>
                        {children}
                    </Grid>
                </Box>
            </Content>
        </>
    )
}
const Landing = () => {
    return (
        <>
            <LandingContainer >
                <Header />
                <Summary />
                <WhySection />
            </LandingContainer>
        </>
    )
}

export default Landing;