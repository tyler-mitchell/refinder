import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Router from "./Router";
import { Counter } from "./features/counter/Counter";
import app from "firebase/app";
import firebase from "firebase";
import Products from "./features/ecommerce/Products";
import { Toolbar, Typography } from "@material-ui/core";
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
  contentBasedLayoutPreset,
  SidebarTriggerIcon
} from "@mui-treasury/layout";
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyBdhd3g3f8DkpMB8DmmLrlXjpVLyOUkngw",
  authDomain: "refinder-exchange.firebaseapp.com",
  databaseURL: "https://refinder-exchange.firebaseio.com/",
  projectId: "refinder-exchange",
  storageBucket: "refinder-exchange.appspot.com",
  messagingSenderId: "795224011963",
  appId: "1:795224011963:web:06a200ceb6087f4d32a59e"
};
// Initialize Firebase
if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}
function App() {
  return (
    <div className="App">
      <Root config={contentBasedLayoutPreset}>
        <Header>

          <Toolbar>
            <SidebarTrigger>
              <SidebarTriggerIcon />
            </SidebarTrigger>
            <Typography variant="h6">Refinder!</Typography> {/*Title on top left of the page*/}
          </Toolbar>
        </Header>
        <Router />

      </Root>
    </div>
  );
}

export default App;
