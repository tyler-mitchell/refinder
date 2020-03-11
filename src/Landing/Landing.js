import React from "react"
import {Grid, Typography, Toolbar, Button,Container, Box} from '@material-ui/core'


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

const Header = () => {
    return(
      

            <Grid container direction="column" xs={8}>
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
               
               <Grid item> <Button variant="contained">Get Started</Button></Grid>
            </Grid>
   
    )
}

const NavigationBar = () => {
    return(
        <AppHeader>
        <Toolbar>
            <SidebarTrigger>
              <SidebarTriggerIcon />
            </SidebarTrigger>

            <Button variant="text">Log In</Button>
            <Button variant="contained">Get Started</Button>
          </Toolbar>
        </AppHeader> 
    )
}

const Landing = () => {
    return(
        <>
            
            <NavigationBar/>
           <Content > 
          <Box width="100%" px="30px" display="flex" justifyContent="center" justifyItems="center">
               <Header/>
            </Box>
            </Content>



        </>
    )
}

export default Landing;