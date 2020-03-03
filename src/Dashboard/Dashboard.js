import React from 'react'
import { NavLink, BrowserRouter, Switch, Route } from "react-router-dom";

import {
    Root,
    Header,
    Sidebar,
    Content,
    Footer,
    CollapseBtn,
    CollapseIcon,
    SidebarTrigger,
    cozyLayoutPreset,
    SidebarTriggerIcon
} from "@mui-treasury/layout";
import Products from '../features/ecommerce/Products'
import NavContent from "./NavContent";

const Dashboard = () => {
    return (
        <>
            <Sidebar>
                <NavContent />
            </Sidebar>
            <Content>
                <Products />
            </Content>
        </>
    )
}

export default Dashboard